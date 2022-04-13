module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-preset-env')({
      features: {
        'nesting-rules': true
      }
    }),
    require('postcss-custom-media')({
      importFrom: 'src/styles/scaffolding/media-query.css',
    }),
    require('autoprefixer'),
    require('postcss-sort-media-queries'),
  ],
}
