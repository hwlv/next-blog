/* eslint-disable */
const withCss = require('@zeit/next-css')

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.css'] = file => {}
}

module.exports = withCss({
    webpack(config) {
        const eslintRule = {
            enforce: 'pre',
            test: /.(js|jsx)$/,
            loader: 'eslint-loader',
            exclude: [
                path.resolve(__dirname, '/node_modules'),
            ],
        }
        config.module.rules.push(eslintRule)
        return config
    }
})
