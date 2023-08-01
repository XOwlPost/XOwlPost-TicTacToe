"use strict";

const {IdentityError} = require("./utils.js");

class Identity {
    /**
     * @param {TrustedPlatform} trustedPlatform
     */
    constructor(trustedPlatform, log) {
        this.trustedPlatform = trustedPlatform;

        this.logCtx = log.createContext("identity", {id: -1, appId: -1});
        this.logCtx.trace("created");

        this.signedTransactions = new Map();

        this.hasNewTransactions = false;

        this.currentTxId = undefined;
        this.currentTxResolve = undefined;
    }

    /**
     * @param {object} data
     */
    load(data) {
        this.id = data.appId;
        this.appId = data.appId;
        this.accessToken = data.accessToken;

        this.logCtx.update("identity", {id: this.appId, appId: this.appId});
        this.logCtx.trace("updated");
    }

    toJSON() {
        return {
            id: this.appId,
            appId: this.appId,
            accessToken: this.accessToken
        };
    }

    /**
     * @param {number} appId
     * @param {string} accessToken
     */
    link(appId, accessToken = undefined) {
        this.logCtx.update("identity", {appId: appId});
        this.logCtx.info("linking");

        this.id = appId;
        this.appId = appId;
        this.accessToken = accessToken;

        this.trustedPlatform.wallet.emit("save");
    }

    async regenerateAccessToken() {
        this.logCtx.trace("regenerateAccessToken");

        this.accessToken = await this.trustedPlatform.getAccessToken();
        this.logCtx.trace("Access token: %s", this.accessToken);

        this.trustedPlatform.wallet.emit("save");
    }

    async listenToPusher() {
        let platformData = await this.trustedPlatform.getPlatformData(this);
        if (platformData.notifications.pusher === undefined) {
            throw new IdentityError("Error retrieving pusher information from the Platform.");
        }

        this.trustedPlatform.wallet.pusherListener.listen(
            platformData.notifications.pusher,
            this.appId,
            (event, data) => {
                this.logCtx.trace("Pusher event: %s", event, data);

                switch (event) {
                case "EnjinCloud\\Events\\TransactionPending":
                    this.hasNewTransactions = true;
                    break;
                case "EnjinCloud\\Events\\TransactionBroadcast":
                    if (data.transaction.id === this.currentTxId) {
                        this.currentTxResolve(data.transaction.hash);
                    }
                    break;
                }
            }
        );
    }

    async signPendingTransactions() {
        this.logCtx.trace("signPendingTransactions");

        let txs;
        try {
            this.logCtx.trace("pendingTransactions");
            txs = await this.trustedPlatform.getPendingTransactions(this);
        } catch (e) {
            if (e.statusCode === 404) {
                this.logCtx.info("No transactions");
            } else {
                this.logCtx.warnException(e, "Could not fetch transactions");
            }
            return;
        }

        // Transaction signing loop
        this.logCtx.trace("loop");
        for (let tx of txs) {
            if (this.signedTransactions.has(tx.id)) {
                this.logCtx.trace(`TX ${tx.id} already signed`);
                continue;
            }
            this.signedTransactions.set(tx.id, tx);

            try {
                this.logCtx.info(`TX ${tx.id} ${tx.type} "${tx.title}" Value: ${tx.value}`);

                tx.signedTransaction = await this.trustedPlatform.wallet.account.signTransaction(tx);

                this.currentTxId = tx.id;
                let txHashPromise = new Promise((resolve) => {
                    this.currentTxResolve = resolve;
                });

                this.logCtx.info(`Sending Signed TX ${tx.id}`);
                await this.trustedPlatform.sendSignedTransaction(tx, this);

                let txHash = await txHashPromise;
                this.logCtx.info(`TX ${tx.id} broadcast with hash ${txHash}`);
            } catch (e) {
                this.logCtx.warnException(e, "Could not sign transaction.");
                this.signedTransactions.delete(tx.id);
                break;
            }
        }
    }

    async signLoop() {
        await this.listenToPusher();

        const iterationsBeforeForceCheck = 900;
        let iterations = iterationsBeforeForceCheck;

        while (!this.trustedPlatform.wallet.stop) {
            if (++iterations > iterationsBeforeForceCheck) {
                iterations = 0;
                this.hasNewTransactions = true;
            }

            if (this.hasNewTransactions) {
                this.hasNewTransactions = false;
                try {
                    await this.signPendingTransactions();
                } catch (e) {
                    this.logCtx.warnException(e, "Exception occurred while looping over transactions to sign.");
                }
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

module.exports = Identity;
