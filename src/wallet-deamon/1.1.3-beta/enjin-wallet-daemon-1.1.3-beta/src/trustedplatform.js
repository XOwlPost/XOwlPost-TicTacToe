"use strict";

const rp = require("request-promise-native");

const Identity = require("./identity.js");
const { TrustedPlatformError, TrustedPlatformLoginError, formatTime_ms } = require("./utils.js");

class TrustedPlatform {
    /**
     * @param {Wallet} wallet
     * @param {JSONLog} log
     */
    constructor (wallet, log) {
        this.wallet = wallet;

        this.logCtx = log.createContext("tp", {id: -1});
        this.logCtx.trace("created");
    }

    /**
     * @param {number} id
     */
    init(id) {
        this.id = id;
        this.urlCache = "";
        this.urlTimestamp = 0;
        this.urlFailCount = 0;
        this.identities = new Map();

        this.logCtx.update("tp", {id: this.id});
    }

    /**
     * @param {object} data
     */
    load(data) {
        this.logCtx.trace("load");
        this.id = data.id;
        this.urlCache = data.url;
        this.urlTimestamp = parseInt(data.urlTimestamp) || 0;
        this.urlFailCount = parseInt(data.urlFailCount) || 0;

        /** @type {Map<number, Identity>} */
        this.identities = new Map((data.identities || []).map(i => {
            let identity = new Identity(this, this.logCtx.log);
            identity.load(i);
            return [identity.id, identity];
        }));

        this.logCtx.update("tp", {id: this.id});
    }

    toJSON() {
        return {
            id: this.id,
            url: this.urlCache,
            urlTimestamp: this.urlTimestamp,
            urlFailCount: this.urlFailCount,
            identities: Array.from(this.identities.values())
        };
    }

    /**
     * @param {string} accessToken
     */
    headers(accessToken = undefined) {
        let headers = {
            "User-Agent": `Enjin-Wallet-Daemon/${this.wallet.config.version}`,
            "X-Network": this.wallet.config.chain
        };

        if (accessToken) {
            headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return headers;
    }

    get url() {
        this.logCtx.trace("url %s", new Date());
        this.logCtx.trace("Last fetch %s", new Date(this.urlTimestamp));

        let age         = Date.now() - this.urlTimestamp;
        let maxAge      = cooldown(this.logCtx, this.urlFailCount);

        this.logCtx.trace("Age %s", formatTime_ms(age));

        if (this.urlCache && age < maxAge && this.urlFailCount === 0) {
            // We have a valid cached URL, return it.
            this.logCtx.trace("URL [cached] %s", this.urlCache);
            return Promise.resolve(this.urlCache);
        }

        let delay_ms = maxAge - age;

        if (delay_ms > 1000) {
            this.logCtx.debug("url: must wait %s", formatTime_ms(delay_ms));
        }

        return new Promise(

            // Nope, must wait...
            resolve => setTimeout(resolve, delay_ms)

        ).then(async () => {
            try {
                let oldUrlCache = this.urlCache;

                this.urlCache = await this.wallet.enjinx.getPlatformUrl(this.id);
                this.urlFailCount = 0;

                if (this.urlCache !== oldUrlCache) {
                    this.logCtx.info("URL: %s", this.urlCache);
                }

                return this.urlCache;
            } catch (e) {
                this.urlCache = "";
                ++this.urlFailCount;

                this.logCtx.warnException(e, "Failed to fetch URL");

                throw e;
            } finally {
                this.urlTimestamp = Date.now();
                this.wallet.emit("save");
            }
        });
    }

    get graphQlEndpoint() {
        this.logCtx.trace("graphQlEndpoint");

        return this.url.then( u => new URL("/graphql/wallet", u) );
    }

    /**
     * @param {string} query
     * @param {object} variables
     * @param {string} accessToken
     */
    async graphQl(query, variables = {}, accessToken = undefined) {
        this.logCtx.trace("graphQl");

        let response = await rp({
            uri: await this.graphQlEndpoint,
            method: "POST",
            headers: this.headers(accessToken),
            body: {query: query, variables: variables},
            json: true,
        });

        if (typeof response.error !== "undefined") {
            this.logCtx.error(response.error);
            throw new TrustedPlatformError("There was an unexpected error.");
        }

        return response.data.result;
    }

    /**
     * @param work
     * @param identity
     * @returns {Promise<*>}
     */
    async tryLoginRetry(identity, work) {
        try {
            return await work();
        } catch (e) {
            if ((e.constructor && e.constructor.name === "StatusCodeError" && e.statusCode === 401) ||
                (e.constructor && e.constructor.name === "TrustedPlatformLoginError")) {
                // Access token expired, generate a new access token for the identity.
                await identity.regenerateAccessToken();
                return await work();
            } else {
                throw e;
            }
        }
    }

    /**
     * @param {string} code
     */
    async link(code) {
        this.logCtx.trace("link");

        if (!this.wallet.account) {
            throw new TrustedPlatformError("No account setup. Re-run wallet with account new or account import <PRIVATE KEY>");
        }

        const accessToken = await this.getAccessToken();
        let response = await this.graphQl(
            "mutation ($code: String) { result: LinkApp(linkingCode: $code) { id } }",
            {code: code},
            accessToken,
        );

        let identity = this.identities.get(response.id);
        if (!identity) {
            identity = new Identity(this, this.logCtx.log);
            this.identities.set(response.id, identity);
        }

        identity.link(response.id, accessToken);
    }

    async getAccessToken() {
        this.logCtx.trace("getAccessToken: %s", this.wallet.account.address);

        let nonce = await this.graphQl("{ result: Nonce }");
        this.logCtx.trace("Nonce to sign: %s", nonce);

        let signedTx = await this.wallet.account.signDummyTransaction(nonce);
        this.logCtx.trace("Signed transaction: %s", nonce);

        let result = (await this.graphQl(
            "query ($address: String, $txn: String) { result: Auth(ethAddress:$address signedTx:$txn) {accessToken} }",
            {address: this.wallet.account.address, txn: signedTx}
        ));

        if (typeof result.accessToken === "undefined") {
            throw new TrustedPlatformLoginError("Failed to generate an access token.");
        }

        let accessToken = result.accessToken;
        this.logCtx.trace("Access token: %s", accessToken);

        return accessToken;
    }

    /**
     * @param {Identity} identity
     */
    async getPendingTransactions(identity) {
        this.logCtx.trace("getPendingTransactions");

        return await this.tryLoginRetry(identity, async () => {
            return await this.graphQl(
                "query ($appId: Int, $state: TransactionState!) { result: Transactions(appId: $appId, state: $state, sort: {field: createdAt}) { id, title, type, value, recipientAddress, encodedData } }",
                {
                    appId: identity.appId,
                    state: "PENDING"
                },
                identity.accessToken
            );
        });
    }

    /**
     * @param {Identity} identity
     */
    async getPlatformData(identity) {
        this.logCtx.trace("getPlatformData");

        return await this.tryLoginRetry(identity, async () => {
            let response = await this.graphQl(
                "query platform { result: Platform { network, notifications, contracts } }",
                {},
                identity.accessToken
            );

            if (response.notifications === null) {
                throw new TrustedPlatformLoginError();
            }

            return response;
        });
    }

    /**
     * @param {object} tx
     * @param {Identity} identity
     */
    async sendSignedTransaction(tx, identity) {
        this.logCtx.trace("sendSignedTransaction");

        let response = await this.graphQl(
            "mutation ($id: Int, $data: String, $backupData: String, $cancelData: String, $nonce: String) { result: ExecuteTransaction(id: $id, data: $data, backupData: $backupData, cancelData: $cancelData, nonce: $nonce) { id } }",
            {
                id: tx.id,
                data: tx.signedTransaction,
                backupData: null,
                cancelData: null,
                nonce: null,
            },
            identity.accessToken
        );

        this.logCtx.info(`TX Sent to TP ${tx.id}`);

        this.logCtx.trace("sendSignedTransaction response: %s", JSON.stringify(response));
    }

    async signPendingTransactions() {
        this.logCtx.trace("signPendingTransactions");

        let workers = [];
        for (let i of this.identities.values()) {
            workers.push(i.signLoop());
        }

        return Promise.all(workers);
    }
}

function cooldown(logCtx, failCount = 0) {
    logCtx.trace("cooldown fail=%s", failCount);

    let base        = 1.8 + Math.random() * 0.4; // [1.8 - 2.2)
    let multiplier  = Math.min(60, Math.pow(base, failCount));

    let cd = Math.floor(1000 * 60 * multiplier);

    logCtx.trace("cooldown result=%s", formatTime_ms(cd));

    return cd;
}

module.exports = TrustedPlatform;
