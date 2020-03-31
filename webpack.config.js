module.exports = {
  entry: __dirname + "/js/project/index.js",
  output: {
    path: __dirname + "/dist/",
    filename: "[name].bound.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/presets-env',{
                targets: {
                  browsers: ['>1%']
                }
              }]
            ]
          }
        }
      }
    ]
  }
}
