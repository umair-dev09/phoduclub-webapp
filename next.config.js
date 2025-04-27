const { withNextVideo } = require('next-video/process')

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/,
      loader: 'babel-loader',
    })

    config.plugins.push(new webpack.ProvidePlugin({
      'window.Quill': 'quill'
    }))

    return config
  },
  images: {
    domains: ['firebasestorage.googleapis.com'], // Add Firebase Storage domain
  },
  experimental: {
    // Disable Turbopack
    turbo: false,
  }
};

module.exports = nextConfig;
