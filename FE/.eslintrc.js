module.exports = {
  root: true,
  extends: ["@react-native", "plugin:prettier/recommended"],
  plugins: ["prettier"],
  rules: {
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        before: false,
        after: true,
        overrides: { arrow: { before: true, after: true } },
      },
    ],
    "arrow-spacing": ["error", { before: true, after: true }],
  },
};
