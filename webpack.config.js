module.exports = {
    entry: './js/index',
    output: {
        path: 'builds',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                // include: __dirname + '/js',
                exclude: /node_modules/,
                // query: {
                //     presets: ['es2015']
                // }
                // include: '/js'
            }
        ]
    }
};