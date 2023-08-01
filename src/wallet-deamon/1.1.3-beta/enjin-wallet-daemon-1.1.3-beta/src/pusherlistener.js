"use strict";

const Pusher = require("pusher-js");

const {PusherError} = require("./utils.js");

class PusherListener {
    constructor() {
        this.pushers = new Map();
    }

    listen(config, appId, cb) {
        const key = config.key + config.options.cluster + config.options.encrypted;
        let pusher = this.pushers.get(key);

        try {
            if (pusher === undefined) {
                pusher = new Pusher(config.key, {
                    cluster: config.options.cluster,
                    forceTLS: config.options.encrypted
                });
                this.pushers.set(key, pusher);
            }
        } catch (e) {
            throw new PusherError("Could not connect to Pusher.");
        }

        try {
            const channel = pusher.subscribe(config.channels.app.replace("{id}", appId));
            channel.bind_global(cb);
        } catch (e) {
            console.error(e);
            throw new PusherError("Could not listen on Pusher channel.");
        }
    }
}

module.exports = PusherListener;
