"use strict";

const fs = require("fs");
const path = require("path");
const util = require("util");
const c = require("ansi-colors");

const LOG_LEVEL_PRIORITIES = {
    "fatal": 100,
    "error": 200,
    "warn":  300,
    "info":  400,
    "debug": 500,
    "trace": 600
};

const LOG_LEVEL_PREFIX = {
    "fatal": "!!!",
    "error": "  !",
    "warn":  "  *",
    "info":  "   ",
    "debug": "  -",
    "trace": "  ."
};

const LOG_LEVEL_WRAPPER = {
    "fatal": c.bgRed,
    "error": c.red,
    "warn":  c.yellow,
    "info":  c.white,
    "debug": c.gray,
    "trace": c.gray
};

class Context {
    constructor(name, opt, log) {
        this.update(name, opt);
        this.log = log;
    }

    update(name, opt) {
        this.name = name;
        this.opt = opt;

        if (opt) {
            this.str = "";
            for (const [key, value] of Object.entries(opt)) {
                this.str += `${key}: ${value}, `;
            }
            this.str = this.str.substring(0, this.str.length - 2);
            if (this.str) {
                this.str = "(" + this.str + ")";
            }
        }
    }

    toJSON() {
        return {
            name: this.name,
            opt: this.opt
        };
    }

    fatal(...args) {
        this.log.fatal(this, ...args);
    }
    
    error(...args) {
        this.log.error(this, ...args);
    }
    
    warn(...args) {
        this.log.warn(this, ...args);
    }
    
    info(...args) {
        this.log.info(this, ...args);
    }
    
    debug(...args) {
        this.log.debug(this, ...args);
    }
    
    trace(...args) {
        this.log.trace(this, ...args);
    }

    fatalException(e, ...args) {
        this.log.fatalException(e, this, ...args);
    }
    
    errorException(e, ...args) {
        this.log.errorException(e, this, ...args);
    }
    
    warnException(e, ...args) {
        this.log.warnException(e, this, ...args);
    }
    
    infoException(e, ...args) {
        this.log.infoException(e, this, ...args);
    }
    
    debugException(e, ...args) {
        this.log.debugException(e, this, ...args);
    }
    
    traceException(e, ...args) {
        this.log.traceException(e, this, ...args);
    }
}

class JSONLog {
    constructor(folder, prefix, consoleLevel="info", fileLevel="debug") {
        let filename = path.join(folder, prefix + (new Date()).toISOString().replace(/:/g, "-") + ".log");
        console.log("Logging to", filename);
        this.logStream = fs.createWriteStream(filename);
        this.consoleLevel = LOG_LEVEL_PRIORITIES[consoleLevel];
        this.fileLevel = LOG_LEVEL_PRIORITIES[fileLevel];

        this.context = this.createContext("");
    }

    createContext(name, opt) {
        return new Context(name, opt, this);
    }

    end(cb) {
        this.logStream.end();
        this.logStream.on("finish", cb);
    }

    emit(exception, level, context, message, ...args) {
        let priority = LOG_LEVEL_PRIORITIES[level];

        let loggedException = 
            exception ? 
                {
                    message: exception.message,
                    stack: exception.stack,
                    raw: exception,
                    str: "" + exception
                }
                :
                undefined;

        let fileEntry = JSON.stringify({
            timestamp: Date.now(),
            level: level,
            context: context,
            message: message,
            args: args,
            exception: loggedException
        });

        if (!priority) {
            this.error("Could not log message: %s", fileEntry);
            return;
        }

        if (priority <= this.consoleLevel) {
            let messageString = args.length > 0 ? util.format(message, ...args) : message;

            let logParams = [LOG_LEVEL_PREFIX[level]];

            if (context.name) {
                logParams.push(LOG_LEVEL_WRAPPER[level](context.name));
                logParams.push("-");
            }

            logParams.push(messageString);

            if (context.str) {
                logParams.push("-");
                logParams.push(context.str);
            }

            console.log.apply(console, logParams);
        }

        if (priority <= this.fileLevel) {
            this.logStream.write(fileEntry);
            this.logStream.write("\n");
        }
    }

    log(level, ...args) {
        let context = this.context;
        if (args[0] instanceof Context) {
            context = args[0];
            args = args.slice(1);
        }

        this.emit(undefined, level, context, args[0], ...args.slice(1));
    }

    fatal(...args) {
        this.log("fatal", ...args);
    }
    
    error(...args) {
        this.log("error", ...args);
    }
    
    warn(...args) {
        this.log("warn", ...args);
    }
    
    info(...args) {
        this.log("info", ...args);
    }
    
    debug(...args) {
        this.log("debug", ...args);
    }
    
    trace(...args) {
        this.log("trace", ...args);
    }

    logException(e, level, ...args) {
        let context = this.context;
        if (args[0] instanceof Context) {
            context = args[0];
            args = args.slice(1);
        }

        this.emit(e, level, context, args[0], ...args.slice(1));
    }

    fatalException(e, ...args) {
        this.logException(e, "fatal", ...args);
    }
    
    errorException(e, ...args) {
        this.logException(e, "error", ...args);
    }
    
    warnException(e, ...args) {
        this.logException(e, "warn", ...args);
    }
    
    infoException(e, ...args) {
        this.logException(e, "info", ...args);
    }
    
    debugException(e, ...args) {
        this.logException(e, "debug", ...args);
    }
    
    traceException(e, ...args) {
        this.logException(e, "trace", ...args);
    }
}

module.exports = JSONLog;