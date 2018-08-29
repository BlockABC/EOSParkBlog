module.exports = {
  extends: ['standard', 'standard-react'],
  rules: {
    'no-multi-spaces': 0,
    'comma-dangle': 0,
    'space-before-function-paren': 0,

    'jsx-quotes': [2, 'prefer-double'],
    'react/react-in-jsx-scope': 0,
    'react/jsx-tag-spacing': 0,
  },
  env: {
    browser: true,
  },
  globals: {
    ga: true
  }
}