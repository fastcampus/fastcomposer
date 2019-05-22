module.exports = {
  root: true,
  env: {
    node: true,
    mocha: true,
  },
  plugins: ["vue", "prettier"],
  'extends': [
    "prettier",
    "prettier/standard",
    "plugin:vue/recommended",
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    "prettier/prettier": "error",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
