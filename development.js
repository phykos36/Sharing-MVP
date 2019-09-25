import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const src  = path.join(__dirname, 'src')
const dist = path.join(__dirname, 'dist')

export default {
  entry: path.join( src, '/index.jsx'),

  output: {
    path: dist,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
     new HtmlWebpackPlugin({
      template: path.join( src, '/index.html'),
      filename: 'index.html'
    })
  ]
}
