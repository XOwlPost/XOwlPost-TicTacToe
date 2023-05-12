module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2017
    },
    "rules": {
        "no-console": "off",
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 1
            }
        ],
        "padded-blocks": [
            "error",
            "never"
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
