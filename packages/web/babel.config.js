module.exports = {
  presets: ['@rnx-kit/babel-preset-metro-react-native'],
  plugins: [
    'react-native-web',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '^react-native$': '../../node_modules/react-native',
          'react-native-reanimated-skeleton': '../npm/src/Skeleton',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
