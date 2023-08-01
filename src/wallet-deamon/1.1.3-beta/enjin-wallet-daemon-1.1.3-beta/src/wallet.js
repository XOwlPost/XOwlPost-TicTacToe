"use strict";

const EventEmitter = require("events");

const ethers = require("ethers");
const prompt = require("password-prompt");

const Account = require("./account.js");
const EnjinX = require("./enjinx.js");
const TrustedPlatform = require("./trustedplatform.js");
const PusherListener = require("./pusherlistener.js");
const { WalletError } = require("./utils.js");

class Wallet extends EventEmitter {
    constructor(config, log) {
        super();

        this.logCtx = log.createContext("wallet");
        this.logCtx.trace("created");

        this.config = config;

        this.enjinx = new EnjinX(this, log);

        this.pusherListener = new PusherListener();
    }

    async load(data) {
        this.logCtx.trace("load");

        if (data.privateKey) {
            this.account = new Account(this, data.privateKey, this.logCtx.log);
            await this.account.init();
        }

        /** @type {Map<number, TrustedPlatform>} */
        this.trustedPlatforms = new Map((data.trustedPlatforms || []).map(tp => {
            let trustedPlatform = new TrustedPlatform(this, this.logCtx.log);
            trustedPlatform.load(tp);
            return [trustedPlatform.id, trustedPlatform];
        }));
    }

    toJSON() {
        return {
            privateKey: this.account,
            trustedPlatforms: Array.from(this.trustedPlatforms.values())
        };
    }

    async create() {
        this.logCtx.info("Creating new account.");

        let tempAccount = ethers.Wallet.createRandom();
        await this.import(tempAccount.privateKey);
    }

    async import(privateKey) {
        if (this.account) {
            throw new WalletError("Data loss prevention: cannot overwrite account details.");
        }

        if (!privateKey) {
            this.logCtx.info("Importing private key...");
            privateKey = await prompt("Private key:", {method: "hide"});
        }

        this.account = new Account(this, privateKey, this.logCtx.log);
        await this.account.init();

        this.emit("save");
    }

    async link(code) {
        this.logCtx.info("Linking to new app using", code);

        let tpId = getTpId(this.logCtx, code);

        this.logCtx.info("Connecting to Platform: %s", tpId);

        /** @type {TrustedPlatform} */
        let trustedPlatform = this.trustedPlatforms.get(tpId);
        if (!trustedPlatform) {
            // TP doesn't exist. Must create it now.
            trustedPlatform = new TrustedPlatform(this, this.logCtx.log);
            this.trustedPlatforms.set(tpId, trustedPlatform);
            trustedPlatform.init(tpId);
        }

        await trustedPlatform.link(code);
    }

    async sign() {
        this.logCtx.info("Beginning to sign transactions.");

        if (!this.account) {
            throw new WalletError("No account setup. Re-run wallet with account new or account import <PRIVATE KEY>");
        }

        let tps = Array.from(this.trustedPlatforms.values());
        if (tps.length === 0) {
            throw new WalletError("Account not linked to any Platform. Re-run wallet with link <CODE>");
        }

        let workers = tps.map( tp => tp.signPendingTransactions() );

        return Promise.all(workers);
    }
}

function getTpId(logCtx, code) {
    logCtx.info("Getting TP ID...");

    let m = code.match(/^([A-Z]*)[0-9].*$/);

    try {
        let tpId = alpha2num(m[1]);
        logCtx.info("TP ID is", tpId);
        return tpId;
    } catch (e) {
        throw new WalletError("Invalid Code, " + code);
    }
}

function alpha2num(a) {
    let r = 0;
    let l = a.length;
    for (let i = 0; i < l; i++) {
        r += Math.pow(26, i) * (a.charCodeAt(l - i - 1) - 0x40);
    }

    if (!r) {
        throw new WalletError(`String "${a}" is not an alpha encoded number`);
    }

    return r - 1;
}

module.exports = Wallet;
