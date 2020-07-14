const path = require('path')
const { builtinModules } = require('module')

module.exports = {
    entry: path.join(__dirname, '/src/index.js'),
    devtool: 'source-map',
    mode: 'development',
    module: {
        rules:[{
        use:{
            loader:'babel-loader',
        },
        exclude:/node_modules/
        }]
    }
}