module.exports = {
    publicPath: "/drap",
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.js', '.vue', '.json']
        }
    }
}