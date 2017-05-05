const isProduction = process.env.NODE_ENV;

module.exports = {
    "env": {
        "browser": true,
        "es6": true,
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
        }
    },
    "extends": ["airbnb/base", "plugin:react/recommended"],
    "rules": {
        "no-console": isProduction ? ["error", { allow: ["info", "warn", "error"] }] : ["off"],
        "no-debugger": isProduction ? ["error"] : ["off"],
        "class-methods-use-this": 0,
        "import/prefer-default-export": 0,
        "react/prop-types": 1,
        "arrow-body-style": 0,
    },
    "plugins": [
      "react"
    ]
};
