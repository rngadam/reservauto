// eslint.config.js
module.exports = [
  {
    files: ["app.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        browser: true,
        L: true,
        Notification: true,
        document: true,
        navigator: true,
        setInterval: true,
        alert: true,
        console: true,
        fetch: true
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  {
    files: ["server.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        node: true,
        module: true,
        require: true,
        __dirname: true,
        process: true
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        node: true,
        test: true,
        expect: true
      }
    },
    rules: {
      "no-unused-vars": "warn"
    }
  }
];
