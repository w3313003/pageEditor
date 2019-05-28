const prod = process.env.NODE_ENV === "production";
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/typescript"],
  rules: {
    "no-console": prod ? "error" : "off",
    "no-debugger": prod ? "error" : "off",
    "no-parsing-error": "off"
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  }
};
