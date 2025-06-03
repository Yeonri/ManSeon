module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:@react-native/babel-preset", "nativewind/babel"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          allowlist: ["CHATBOT_API", "API_BASE","IMAGE_API"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
