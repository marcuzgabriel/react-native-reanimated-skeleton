import { fixupPluginRules } from '@eslint/compat';
import eslint from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactCompilerPlugin from 'eslint-plugin-react-compiler';
import eslintReactNative from 'eslint-plugin-react-native';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      'utils/**',
      '.yarn/**',
      '**/.ondevice/**',
      '**/node_modules/**',
      '**/packages/app/ios/**',
      '**/packages/app/android/**',
      '**/packages/expo/android/**',
      '**/packages/expo/ios/**',
      '**/__mocks__/**',
      '**/*.mjs',
      '**/*.js'
    ]
  },
  {
    name: 'react-compiler',
    plugins: { 'react-compiler': reactCompilerPlugin },
    rules: {
      'react-compiler/react-compiler': 'error',
    },
  },
  {
    name: 'eslint-plugin-jest',
    files: ['**/*.test.ts', '**/*.test.tsx'],
    plugins: { jest: jestPlugin },
    ...jestPlugin.configs['flat/recommended'],    
  },
  {
    name: 'eslint-plugin-import',
    plugins: { 'import': importPlugin },
    ...importPlugin.flatConfigs.recommended,
  },
  {
    name: 'eslint-plugin-react',
    plugins: { 'react': reactPlugin },
    ...reactPlugin.configs.flat.recommended
  },
  {
    name: 'eslint-plugin-react-hooks',
    plugins: { 'react-hooks': reactHooksPlugin },
    ...reactHooksPlugin.configs['recommended-latest'],
  },
  {
    name: 'eslint-plugin-react-native',
    /** Meta is currently implementing Eslint 9 - PR is not yet merged. Therefore,
     * eslint-plugin-react-native is used instead of @react-native until meta have updated
     * their config. A side-note is that meta's eslint config is based on eslint-plugin-react-native.
     * 
     * @see https://github.com/facebook/react-native/issues/42996
     * @see https://github.com/facebook/react-native/pull/43959/files
     */
    plugins: { 'react-native': fixupPluginRules(eslintReactNative) },
    rules: eslintReactNative.configs.all.rules
  },
  {
    name: 'eslint-plugin-prettier',
    plugins: { prettier: prettierPlugin },
    rules: prettier.rules,
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.es2020,
        ...globals.node
      },
    },
    settings: {
      react: { pragma: 'React', version: 'detect' },
      jest: { pragma: 'jest', version: 'detect' },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'import/ignore': ['react-native'],
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
    },
    rules: {
      'prettier/prettier': 'error',
      'react-native/sort-styles': 'off',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'off',
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      'jest/prefer-expect-assertions': 'off',
      "dot-notation": ["error", { "allowKeywords": false }], // aligns eslint with ts with dot notations
      'no-console': 2, // use createLogger instead
      'dot-notation': 0, // is conflicting with prettier
      'import/no-cycle': ['error', { maxDepth: 5, ignoreExternal: true }],

      /* TODO: Discuss with the team whether we are using TypeScript effectively.
      Which errors should we enable? Currently, we have quite a few patterns
      in TypeScript that aren't recommended, and it catches a lot of hacky or 
      unusual type solutions throughout the app. */
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/consistent-type-definitions': 0,
      '@typescript-eslint/array-type': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      '@typescript-eslint/no-non-null-assertion': 0,
      '@typescript-eslint/no-floating-promises': 0, // reason for some of our biggest issues
      '@typescript-eslint/no-empty-function': 0,
      '@typescript-eslint/no-unsafe-return': 0,
      '@typescript-eslint/no-base-to-string': 0,
      '@typescript-eslint/restrict-template-expressions': 0,
      '@typescript-eslint/no-misused-promises': 0,
      '@typescript-eslint/no-inferrable-types': 0,
      '@typescript-eslint/unbound-method': 0,
      '@typescript-eslint/no-unsafe-enum-comparison': 0,
      '@typescript-eslint/no-unused-expressions': 0,
      '@typescript-eslint/no-invalid-void-type': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/consistent-indexed-object-style': 0,
      '@typescript-eslint/no-unsafe-call': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/require-await': 0,
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unused-vars': 0,
      '@typescript-eslint/no-dynamic-delete': 0,
      '@typescript-eslint/no-redundant-type-constituents': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      '@typescript-eslint/consistent-type-assertions': 0,
      '@typescript-eslint/consistent-generic-constructors': 0,
      '@typescript-eslint/no-unnecessary-type': 0,
      '@typescript-eslint/no-duplicate-type-constituents': 0,
      '@typescript-eslint/no-extraneous-class': 0,
      '@typescript-eslint/prefer-promise-reject-errors': 0,
      '@typescript-eslint/no-unnecessary-type-assertion': 0,
      '@typescript-eslint/await-thenable': 0,
      '@typescript-eslint/prefer-function-type': 0,
      '@typescript-eslint/only-throw-error': 0,
      "@typescript-eslint/prefer-for-of": 0,

      // Hmm what is this?
      'no-constant-binary-expression': 0,

      // Jest
      'jest/no-mocks-import': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/expect-expect': 'off', // recommended to enable it
    },
  },
  {
    /** When rendering stories it uses a functional component structure.
     * This causes the react-hooks/rules-of-hooks to throw an error.
     * 
     * @see file://./packages/storybook/src/molecules/Hotspot/index.stories.tsx
     * */
    files: ['**/*.stories.tsx'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
 
)