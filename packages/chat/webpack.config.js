const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "shuffle-clone",
    projectName: "chat",
    webpackConfigEnv,
    argv,
    // outputSystemJS: true
  });

  return merge(defaultConfig, {
    devServer: {
      hot: false,
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
