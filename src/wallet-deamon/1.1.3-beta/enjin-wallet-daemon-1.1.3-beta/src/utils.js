"use strict";

class EnjinXError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class TrustedPlatformError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class TrustedPlatformLoginError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class WalletError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class EthereumError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class StorageError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class CommandError extends Error {
    constructor(...params) {
        super(...params);
    }
}

class IdentityError extends Error {
    constructor(...params) {
        super(...params);
        this.delay = 20000;
    }
}

class PusherError extends Error {
    constructor(...params) {
        super(...params);
        this.delay = 20000;
    }
}

function formatTime_ms(time_ms) {
    time_ms = Math.floor(time_ms);
    
    let time_s = Math.floor(time_ms / 1000);
    time_ms -= time_s * 1000;

    let time_h = Math.floor(time_s / 3600);
    time_s -= time_h * 3600;

    let time_m = Math.floor(time_s / 60);
    time_s -= time_m * 60;

    return (time_h > 0 ? time_h.toString() + "h" : "")
        + (time_h > 0 || time_m > 0 ? time_m.toString().padStart(2, "0") + "m" : "")
        + time_s.toString().padStart(2, "0")
        + "." + time_ms.toString().padStart(3, "0") + "s";
}

module.exports = {

    CommandError: CommandError,
    EnjinXError: EnjinXError,
    EthereumError: EthereumError,
    IdentityError: IdentityError,
    PusherError: PusherError,
    StorageError: StorageError,
    TrustedPlatformError: TrustedPlatformError,
    TrustedPlatformLoginError: TrustedPlatformLoginError,
    WalletError: WalletError,

    formatTime_ms: formatTime_ms

};