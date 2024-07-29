const { useBabelRc, override, overrideDevServer } = require('customize-cra');
const { DefinePlugin } = require('webpack');
const { version } = require('./package.json');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function overrideConfig(config, env) {
  const plugins = [
    ...config.plugins,
    new DefinePlugin({
      'process.env.NOVU_VERSION': JSON.stringify(version),
    }),
    /* new BundleAnalyzerPlugin() */
  ];

  return {
    ...config,
    plugins,
    ignoreWarnings: [
      {
        message: /Module not found: Error: Can't resolve \'@novu\/ee-.*\' .*/,
      },
    ],
  };
}

const devServerConfig = () => (config) => {
  return {
    ...config,
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    },
  };
};
module.exports = {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  webpack: override(useBabelRc(), overrideConfig),
  devServer: overrideDevServer(devServerConfig()),
};
