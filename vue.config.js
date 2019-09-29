
const publicPath = process.env.NODE_ENV === 'production' ? '/web/drap' : ''

module.exports = {
    publicPath,
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json']
        }
    }
}