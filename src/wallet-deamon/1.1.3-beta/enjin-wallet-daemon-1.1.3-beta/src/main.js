"use strict";

const mkdirp = require("mkdirp");
const path = require("path");
const fs = require("fs");

const Storage = require("./storage.js");
const Wallet = require("./wallet.js");
const JSONLog = require("./jsonlog.js");

const { CommandError, WalletError} = require("./utils.js");

const packageData = require("../package.json");

//
// Log setup
//
let baseFolder = process.env.LOCALAPPDATA || process.env.HOME;
if (!baseFolder) {
    console.error("HOME not found in environment");
    process.exit(1);
}
const logFolder = path.join(baseFolder, "enjin-wallet-daemon");
mkdirp.sync(logFolder);
const log = new JSONLog(logFolder, "enjin-wallet-daemon-", "info", "trace");

//
// Config setup
//
const configDir = process.pkg ? path.dirname(process.execPath) : path.join(__dirname, "..");
let configFile = path.join(configDir, "config.json");
let config = {};
try {
    log.info("Reading config file:", configFile);
    config = JSON.parse(fs.readFileSync(configFile, {"encoding": "utf-8"}));
} catch (e) {
    configFile = path.join(configDir, "example-config.json");
    log.info("Reading backup config file:", configFile);
    config = JSON.parse(fs.readFileSync(configFile, {"encoding": "utf-8"}));
}

config.version = packageData.version;

//
// Call to main
//
main().then(() => {
    log.end(() => {
        process.exit(0);
    });
}).catch((err) => {
    log.errorException(err, "Error");

    if (err instanceof CommandError || err instanceof WalletError) {
        console.error(`
--------------------------------------------------------------------------------


ERROR:

    ${err.message}


Usage:
    enjin-wallet-daemon should be called in this order:
    1) Create or import an account
        create:
            enjin-wallet-daemon account new
        import:
            enjin-wallet-daemon account import
    2) Link to TP
            enjin-wallet-daemon link <CODE>
    3) Run
            enjin-wallet-daemon run

    Other available commands:
        Make a copy of the wallet's storage to FILENAME:
            enjin-wallet-daemon backup <FILENAME>

        Print out decrypted storage UNSAFE!:
        (FILENAME is optional, will use wallet storage if left blank)
            enjin-wallet-daemon decrypt [FILENAME]

--------------------------------------------------------------------------------`
        );
    } else if (err.name == "StatusCodeError") {
        console.error("--------------------------------------------------------------------------------");
        console.error(JSON.stringify(err.error.errors || err.error.message, null, "  "));
    } else {
        console.error("--------------------------------------------------------------------------------");
        console.error(err.stack || err);
    }

    log.end(() => {
        process.exit(1);
    });
});

//
// Main function
//
async function main() {
    let storage = new Storage(config, log);
    let wallet = new Wallet(config, log);

    await storage.init();

    let command = "run";
    if (process.argv.length > 2) {
        command = process.argv[2];
    }

    if (command != "decrypt") {
        log.info("Enjin Wallet Daemon", packageData.version);

        // Make sure storage file exists, can be read, and can be written.
        storage.create();
        await wallet.load(storage.load());
        storage.save(wallet);

        wallet.on("save", () => storage.save(wallet));
    }

    let commands = {
        account: async (action) => {
            if (action === "new") {
                await wallet.create();
            } else if (action === "import") {
                await wallet.import();
            } else {
                throw new CommandError(`Unknown sub-command: "account ${action}"`);
            }
        },

        link: async (code) => {
            await wallet.link(code);
        },

        run: async () => {
            await wallet.enjinx.getVersion();
            await wallet.sign();
        },

        backup: (filename) => {
            storage.save(wallet, filename);
        },

        decrypt: (filename) => {
            storage.dump(filename);
        }

    };

    let commandFunc = commands[command];

    if (typeof(commandFunc) !== "function") {
        throw new CommandError(`Unknown command: "${command}"`);
    }

    let commandArgs = process.argv.slice(3);
    await commandFunc(...commandArgs);
}
