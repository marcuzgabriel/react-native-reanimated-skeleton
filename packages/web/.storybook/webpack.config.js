const path = require("path");
const babelConfig = require("../babel.config");

delete babelConfig.plugins[1][1].alias['^react-native$'];

module.exports = async ({ config: baseConfig }) => {
  baseConfig.module.rules.push({
    test: /\.(j|t)sx?$/,
    use: [
      {
        loader: 'babel-loader',
        options: babelConfig,
      },
    ]
  });

  baseConfig.resolve.alias = {
    'react-native$': 'react-native-web',
    'react-native-linear-gradient': 'react-native-web-linear-gradient',
  }
  
  return baseConfig;
};