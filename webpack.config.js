
module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, loader: 'babel-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
}
