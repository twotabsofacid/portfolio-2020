// next.config.js
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')
const withPurgeCss = require('next-purgecss')

require('dotenv').config()

// With purge css
const prodConfig = withPlugins(
  [withTM],
  withSass(
    withPurgeCss({
      target: 'serverless',
      distDir: '.next',
      env: {
        CONTENTFUL_SPACE:
          process.env.CONTENTFUL_SPACE,
        CONTENTFUL_TOKEN:
          process.env.CONTENTFUL_TOKEN,
        CONTENTFUL_PREVIEW_TOKEN:
          process.env.CONTENTFUL_PREVIEW_TOKEN
      },
      purgeCssPaths: [
        'src/pages/**/*',
        'src/components/**/*',
        'src/svg/**/*'
      ],
      purgeCss: {
        whitelist: () => [
          'page-transition-enter',
          'page-transition-enter-active',
          'page-transition-exit',
          'page-transition-exit-active'
        ]
      }
    })
  )
)

const devConfig = withPlugins(
  [withTM],
  {
    target: 'serverless',
    distDir: '.next',
    env: {
      CONTENTFUL_SPACE:
        process.env.CONTENTFUL_SPACE,
      CONTENTFUL_TOKEN:
        process.env.CONTENTFUL_TOKEN,
      CONTENTFUL_PREVIEW_TOKEN:
        process.env.CONTENTFUL_PREVIEW_TOKEN
    }
  }
)

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig
