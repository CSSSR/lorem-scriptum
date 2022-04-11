const fs = require('fs')
const htmlmin = require('html-minifier')
const pluginCSS = require('eleventy-postcss-extension')

module.exports = (config) => {
  config.addPassthroughCopy('src/favicon.svg')
  config.addPassthroughCopy('src/fonts/*.woff2')
  config.addPassthroughCopy('src/assets')
  config.addPassthroughCopy('src/scripts')
  config.addPassthroughCopy('src/styles')

  config.addPlugin(pluginCSS)

  config.addFilter('htmlmin', (value) => {
    return htmlmin.minify(value, {
      removeComments: true,
      collapseWhitespace: true,
    })
  })

  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const result = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
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
