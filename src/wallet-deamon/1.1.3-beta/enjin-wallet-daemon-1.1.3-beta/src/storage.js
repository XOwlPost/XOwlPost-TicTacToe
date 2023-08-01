"use strict";

const crypto = require("crypto");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const prompt = require("password-prompt");

const { StorageError } = require("./utils.js");

class Storage {
    constructor (config, log) {
        this.config = config;
        this.logCtx = log.createContext("storage");
        this.logCtx.trace("created");
    }

    async init() {
        this.logCtx.trace("init");
        let password;
        if (this.config.password) {
            password = fs.readFileSync(this.config.password);
        }
        if (!password) {
            password = await prompt("Password:", {method: "hide"});
        }

        this.aesKey = crypto.pbkdf2Sync(password, this.config.salt, 1000, 128 / 8, "sha512");
    }

    create () {
        this.logCtx.trace("create");
        let storagePath = this.getStoragePath();

        mkdirp.sync(path.dirname(storagePath));

        if (fs.existsSync(storagePath)) {
            return;
        } else {
            this.save({});
        }
    }

    load (storagePath) {
        this.logCtx.trace("load");
        storagePath = this.getStoragePath(storagePath);

        let content = fs.readFileSync(storagePath);
        let encrypted = JSON.parse(content);

        return this.readEncrypted_v3(encrypted);
    }

    save (data, storagePath) {
        this.logCtx.trace("save");
        storagePath = this.getStoragePath(storagePath);

        this.logCtx.info("Saving storage to:", storagePath);

        let content = JSON.stringify(data);

        let iv = Buffer.alloc(16);
        crypto.randomFillSync(iv);

        let cipher = crypto.createCipheriv("aes-128-cbc", this.aesKey, iv);
        let encrypted = cipher.update(content, "utf8", "base64") + cipher.final("base64");

        let encryptedStorage = {
            version: 3,
            iv: iv.toString("base64"),
            encrypted: encrypted
        };
        fs.writeFileSync(storagePath, JSON.stringify(encryptedStorage));
    }

    dump(storagePath) {
        let data = this.load(storagePath);
        console.log(JSON.stringify(data, null, "  "));
    }

    getStoragePath(storagePath) {
        this.logCtx.trace("storagePath");
        if (!storagePath) {
            let baseFolder = process.env.LOCALAPPDATA || process.env.HOME;
            if (!baseFolder) {
                throw new StorageError("HOME not found in environment");
            }

            let walletFolder = "enjin-wallet-daemon";
            let filename = "storage.json";

            storagePath = path.join(baseFolder, walletFolder, filename);
        }

        if (!path.isAbsolute(storagePath)) {
            storagePath = path.join(process.cwd(), storagePath);
        }

        return path.normalize(storagePath);
    }

    readEncrypted_v3(encrypted) {
        this.logCtx.trace("readEncrypted_v3");
        if (encrypted.version != 3) {
            // Upgrade from v2 to v3
            let storage_v2 = this.readEncrypted_v2(encrypted);
            return this.convertToMultipleIdentities(storage_v2);
        }

        return this.decrypt(encrypted);
    }

    readEncrypted_v2(encrypted) {
        this.logCtx.trace("readEncrypted_v2");
        if (!encrypted.iv) {
            // No upgrade to data from v1 to v2.
            return this.readEncrypted_v1(encrypted);
        }

        return this.decrypt(encrypted);
    }

    readEncrypted_v1(encrypted) {
        this.logCtx.trace("readEncrypted_v1");
        return encrypted;
    }

    decrypt(encrypted) {
        this.logCtx.trace("decrypt");
        let iv = Buffer.from(encrypted.iv, "base64");
        let decipher = crypto.createDecipheriv("aes-128-cbc", this.aesKey, iv);
        let decrypted = decipher.update(encrypted.encrypted, "base64", "utf8") + decipher.final("utf8");
        return JSON.parse(decrypted);
    }

    convertToMultipleIdentities(oldStorage) {
        this.logCtx.trace("convertToMultipleIdentities");
        return {
            privateKey: oldStorage.privateKey,
            trustedPlatforms: [{
                id: oldStorage.tpId,
                url: oldStorage.tpUrl,
                urlTimestamp: oldStorage.tpUrlTimestamp,
                urlFailCount: oldStorage.tpUrlFailCount,
                identities: [{
                    id: oldStorage.identity,
                    appId: oldStorage.appId,
                    accessToken: oldStorage.accessToken
                }]
            }]
        };
    }
}

module.exports = Storage;
