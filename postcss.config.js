const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  require('postcss-cssnext')({
    warnForDuplicates: false
  }),
]

if (isDev) {

}

if (isProd) {
  plugins.push(require('cssnano'))
}

module.exports = { plugins }
