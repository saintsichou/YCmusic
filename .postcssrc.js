// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-pxtorem":{
      rootValue: 32,
      unitPrecision: 5,
      // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      propList: ['*'],
      // selectorBlackList: ["van-"],
      // replace: true,
      // mediaQuery: false,
      // minPixelValue: 0
  }
  }
}
