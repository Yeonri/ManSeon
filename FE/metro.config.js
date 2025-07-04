const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

const { assetExts, sourceExts } = defaultConfig.resolver;

const config = mergeConfig(defaultConfig, {
  transformer: {
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: [...assetExts.filter((ext) => ext !== "svg"), "tflite"],
    sourceExts: [...sourceExts, "svg", "ts", "tsx", "js", "jsx"],
  },
});

module.exports = withNativeWind(config, { input: "./global.css" });
