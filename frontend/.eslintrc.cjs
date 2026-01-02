module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // Enable Jest globals
  },
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  rules: {
    'no-unused-vars': 'off', // Turn off base rule
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-undef': 'off', // Turn off for React globals
  },
  globals: {
    React: 'readonly', // React global
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js'],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
