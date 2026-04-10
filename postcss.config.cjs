module.exports = {
  plugins: [
    require('postcss-mixins')({
      mixinsFiles: './src/styles/global/_mixins.css'
    }),
    require('@csstools/postcss-global-data')({
      files: ['./src/styles/global/_media-queries.css']
    }),
    require('postcss-custom-media'),
    require('postcss-media-minmax'),
    require('postcss-pxtorem')({
      rootValue: 16,
      propList: ['*'],
      minPixelValue: 1,
    })
  ]
}