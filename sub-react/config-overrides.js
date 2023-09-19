const { name } = require("./package.json");

const publicPath = process.env.PUBLIC_URL;
module.exports = {
  webpack: function override(config, env) {
    config.entry = config.entry.filter(
      (e) => !e.includes("webpackHotDevClient")
    );
    // config.module.rule('images').use('url-loader').loader('url-loader').options({}).end();
    // config.module.rules = [
    //   {
    //     test: /\.(png|svg|jpe?g|gif|webp)$/i,
    //     use: [
    //       {
    //         loader: "file-loader",
    //         options: {
    //           name: "img/[name].[hash:8].[ext]",
    //           publicPath,
    //         },
    //       },
    //     ],
    //   },...config.module.rules
    // ];
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = "umd";
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    config.output.publicPath = publicPath;
    return config;
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
