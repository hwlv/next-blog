module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    "browser": true,
    "es6": true,
    "node": true
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  extends: "airbnb",
  rules: {
    "semi": [0],
    "react/jsx-filename-extension": [1, {"extensions": [".js", ".jsx"]}],
    "jsx-a11y/anchor-is-valid": [0],
    "react/require-default-props": [0],
    "arrow-body-style": [0],
    "no-param-reassign": [0],
    "react/prop-types": [1],
    "no-console": "error"
  }
}
