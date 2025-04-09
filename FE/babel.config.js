module.exports = {
  presets: ["module:@react-native/babel-preset", "nativewind/babel"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        allowlist: ["CHATBOT_API", "API_BASE"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
