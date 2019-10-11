import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

export default {
  entry: path.join(src, "index.tsx"),

  output: {
    path: dist,
    filename: "bundle.js"
  },

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "ts-loader"
	  }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(src, "index.html"),
      filename: "index.html"
    })
  ]
};
