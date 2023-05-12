"use strict";

const ethers = require("ethers");

const { EthereumError } = require("./utils.js");

class Account {
    constructor (wallet, privateKey, log) {
        this.wallet = wallet;

        this.account = new ethers.Wallet(privateKey);

        this.logCtx = log.createContext("account", {address: this.account.address});

        this.logCtx.info("created");
    }

    async init() {
        this.logCtx.trace("init");

        this.nonce = await this.wallet.enjinx.getNonce(this.address);

        this.logCtx.info("nonce %s", this.nonce);
    }

    toJSON() {
        return this.account.privateKey;
    }

    async signDummyTransaction(msg) {
        this.logCtx.trace("signDummyTransaction");

        const hexData = new ethers.utils.toUtf8Bytes(msg);

        return this.account.signTransaction({
            to: this.address,
            nonce: 0,
            gasLimit: 0,
            gasPrice: 0,
            data: hexData,
            value: 0
        });
    }

    estimateGas(tx) {
        return this.wallet.enjinx.estimateGas(this.address, tx.recipientAddress, tx.encodedData);
    }

    async signTransaction(tx) {
        this.logCtx.trace("signTransaction");

        let estimatedGas = 0;
        try {
            estimatedGas = await this.estimateGas(tx);
            this.logCtx.info("Estimated gas cost: %s", estimatedGas);
        } catch (e) {
            this.logCtx.warnException(e, "Will not sign/send transaction %s: it will revert. Are all input parameters valid?", tx.id);
            throw e;
        }

        let safeGasEstimate = Math.min(8000000, Math.ceil(estimatedGas * 1.2 + 21000));
        this.logCtx.info("Safe gas estimate: %s", safeGasEstimate);

        let gasPrice = 1000000000;

        if (this.wallet.config.chain.toLowerCase() !== "jumpnet") {
            gasPrice = await this.gasPrice;

            let txCost = gasPrice.mul(safeGasEstimate);
            let balance = await this.ethBalance;
            if (txCost.gt(balance)) {
                let msg = "ETH balance too low for transaction";
                this.logCtx.warn(msg);
                throw new EthereumError(msg);
            }
        }

        this.logCtx.info("Nonce: %s", this.nonce);
        return await this.account.signTransaction({
            to: tx.recipientAddress,
            gasLimit: safeGasEstimate,
            gasPrice: gasPrice,
            nonce: this.nonce++,
            data: tx.encodedData,
            value: 0
        });
    }

    get gasPrice() {
        const min = ethers.BigNumber.from(this.wallet.config.minGasPrice);
        const max = ethers.BigNumber.from(this.wallet.config.maxGasPrice);

        return this.wallet.enjinx.getGasPrice()
            .then(
                (price) => {
                    if (price.lt(min))
                        return min;
                    if (price.gt(max))
                        return max;
                    return price;
                }
            );
    }

    get ethBalance() {
        return this.wallet.enjinx.getBalance(this.address).then((x) => {
            return ethers.utils.parseEther(x.toString()).toString();
        });
    }

    get address() {
        return this.account.address;
    }
}

module.exports = Account;
