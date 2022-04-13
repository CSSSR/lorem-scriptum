const fs = require('fs')
const htmlmin = require('html-minifier')

module.exports = (config) => {
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'production') {
    config.addPassthroughCopy('src/favicon.svg')
    config.addPassthroughCopy('src/fonts/*.woff2')
    config.addPassthroughCopy('src/assets')
    config.addPassthroughCopy('src/scripts')
    config.addPassthroughCopy('src/styles')
  }

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const result = htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        sortClassName: true,
        sortAttributes: true,
        html5: true,
        decodeEntities: true,
      })

      return result
    }

    return content
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'layouts',
      data: 'data',
    },
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    templateFormats: ['njk'],
  }
}
