module.exports = {
  extends: ['@antfu', 'standard-jsx'],
  rules: {
    'curly': 'off',
    'max-len': ['error', { code: 100 }],
  },
  ignorePatterns: ['**/*.scss'],
}
