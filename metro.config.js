const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// Default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Merge with Reanimated configuration
const config = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, {
    resolver: {
      sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'], // Ensure .cjs is supported
    },
  })
);

module.exports = config;
