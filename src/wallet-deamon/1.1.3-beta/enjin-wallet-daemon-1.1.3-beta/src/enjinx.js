"use strict";

const ethers = require("ethers");
const rp = require("request-promise-native");

const {EnjinXError} = require("./utils.js");

class EnjinX {
    /**
     * @param {Wallet} wallet
     */
    constructor(wallet, log) {
        this.wallet = wallet;

        this.logCtx = log.createContext("enjinx");
        this.logCtx.trace("created");
    }

    /**
     * @param {string} relative The relative URI to append to EnjinX's base path.
     */
    uri(relative) {
        return new URL(relative, this.wallet.config.enjinxEndpoint);
    }

    get headers() {
        return {
            "User-Agent": `Enjin-Wallet-Daemon/${this.wallet.config.version}`,
            "X-Network": this.wallet.config.chain
        };
    }

    async getVersion() {
        this.logCtx.debug("Querying EnjinX for daemon version information.");

        const errorMessage = "Failed to retrieve daemon version information!";

        try {
            let response = await rp({
                uri: this.uri("/getVersion"),
                headers: this.headers,
                json: true
            });

            if (!response || !response.result) {
                throw new EnjinXError(errorMessage);
            }

            this.logCtx.debug("Version information: ", response.result);

            if (response.updatable) {
                console.info(`
****************************************************
* An update of the Enjin Wallet Daemon is available!
*
* Current: ${this.wallet.config.version}
* Latest: ${response.result.latest}
*
* You can download the latest daemon version at:
* ${response.result.download}
****************************************************
`);

                // Sleep for 3 seconds as to inform the end-user about the available update.
                await new Promise((resolve) => {
                    setTimeout(resolve, 3000);
                });
            }

            return response.result;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }

    /**
     * @param {number} id
     */
    async getPlatformUrl(id) {
        this.logCtx.debug("Querying EnjinX for TP URL");

        const errorMessage = "Failed to retrieve the Platform URL!";

        try {
            let response = await rp({
                uri: this.uri(`/getPlatform/${id}`),
                headers: this.headers,
                json: true
            });

            if (!response || !response.result || !response.result.url) {
                throw new EnjinXError(errorMessage);
            }

            this.logCtx.debug("TP %s URL: %s", id, response.result.url);
            return response.result.url;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }

    async getNonce(address) {
        this.logCtx.debug("Querying EnjinX for Nonce");

        const errorMessage = "Could not fetch nonce";

        try {
            let response = await rp({
                uri: this.uri(`/getNonce/${address}`),
                headers: this.headers,
                json: true
            });

            // Filter out invalid values
            if (!response ||
                response.result === undefined ||
                response.result === null ||
                response.result === "" ||
                isNaN(response.result)) {
                throw new EnjinXError(errorMessage);
            }

            // EnjinX never replies with a decimal number, but in any case, we're only interested in the integral part.
            let nonce = parseInt(response.result);

            this.logCtx.debug("Nonce %s", nonce);
            return nonce;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }

    async getBalance(address) {
        this.logCtx.debug("Querying EnjinX for ETH Balance");

        const errorMessage = "Could not fetch ETH Balance";

        try {
            let response = await rp({
                uri: this.uri(`/getBalance/${address}`),
                headers: this.headers,
                json: true
            });

            if (!response || !response.result) {
                throw new EnjinXError(errorMessage);
            }

            let balance = response.result;

            this.logCtx.debug("Balance %s", balance);
            return balance;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }

    async getGasPrice() {
        this.logCtx.debug("Querying EnjinX for Gas Price");

        const errorMessage = "Could not fetch Gas Price";

        try {
            let response = await rp({
                uri: this.uri("/getGasPrice"),
                headers: this.headers,
                json: true
            });

            if (!response || !response.result) {
                throw new EnjinXError(errorMessage);
            }

            let gasPrice = ethers.BigNumber.from(response.result);

            this.logCtx.debug("Gas price %s", gasPrice);
            return gasPrice;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }

    async estimateGas(from, to, data) {
        this.logCtx.debug("Querying EnjinX for Gas Estimate");

        const errorMessage = "Could not estimate gas";

        try {
            let response = await rp.post({
                method: "POST",
                uri: this.uri("/estimateGas"),
                headers: this.headers,
                body: {
                    "from": from,
                    "to": to,
                    "data": data
                },
                json: true
            });

            if (!response || !response.result) {
                throw new EnjinXError(errorMessage);
            }

            let estimate = ethers.BigNumber.from(response.result);

            this.logCtx.debug("Gas estimate %s", estimate);
            return estimate;
        } catch (e) {
            throw new EnjinXError(errorMessage);
        }
    }
}

module.exports = EnjinX;
