module.exports = {
  presets: ['module:@babel/preset-typescript', 'module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-private-methods',
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
