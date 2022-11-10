const path = require('path')

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      use: ['graphql-tag/loader'],
    })

    return config
  },
  async redirects() {
    return [
      {
        source: '/index',
        destination: '/',
        statusCode: 301,
      },
      {
        source: '/articles/cases',
        destination: '/articles',
        statusCode: 301,
      },
      {
        source: '/product/accessories',
        destination: '/catalog/materials',
        statusCode: 301,
      },
      {
        source: '/product/countertops',
        destination: '/catalog/materials',
        statusCode: 301,
      },
      {
        source: '/product/facades',
        destination: '/catalog/materials',
        statusCode: 301,
      },
      {
        source: '/product/fittings',
        destination: '/catalog/materials',
        statusCode: 301,
      },
      {
        source: '/product/kitchen',
        destination: '/catalog/kitchens',
        statusCode: 301,
      },
      {
        source: '/product/sinks',
        destination: '/catalog/sinks',
        statusCode: 301,
      },
      {
        source: '/product/technics',
        destination: '/catalog/technics',
        statusCode: 301,
      },
    ]
  },
}
