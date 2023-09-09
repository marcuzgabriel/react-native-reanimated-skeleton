const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
    ecmaFeatures: { jsx: true },
  },
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: [path.resolve(__dirname, './tsconfig.json')],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      },
      node: {
        moduleDirectory: [path.resolve(__dirname, './node_modules')],
      },
    },
    'import/ignore': ['react-native'],
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
  },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, jsxSingleQuote: true }],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    '@typescript-eslint/no-var-requires': 0,
    'no-console': 2,
    'dot-notation': 0,
  },
};
