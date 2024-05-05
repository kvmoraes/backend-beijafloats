const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: "latest"
        },
        rules: {
            quotes: ["error", "single"],
            indent: ["error", "tab"],
            semi: ["error", "always"]
        },
        ignores: ["node_modules"]
    }
]