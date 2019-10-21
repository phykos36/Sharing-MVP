import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

export default {
  entry: {
    bundle: path.join(src, "index.tsx"),
    app: path.join(src, "index.css")
  },
  output: {
    path: dist,
    filename: "[name].js"
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
      },
      {
        test: /\.(sa|c)ss$/,
        exclude: /node_modules/,
        loader: ["style-loader", "css-loader", "sass-loader"]
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
