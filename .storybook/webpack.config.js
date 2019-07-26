// const path = require('path');

// const pathToInlineSvg = path.resolve(__dirname, '../resources/icons');

// module.exports = (_, _, defaultConfig) => {
//   const rules = defaultConfig.module.rules;

//   // modify storybook's file-loader rule to avoid conflicts with svgr
//   const fileLoaderRule = rules.find(rule => rule.test.test('.svg'));
//   fileLoaderRule.exclude = pathToInlineSvg;

//   rules.push({
//     test: /\.svg$/,
//     include: pathToInlineSvg,
//     use: [{
//       loader: '@svgr/webpack',
//       options: {
//         icon: true,
//       },
//     }],
//   });

//   return defaultConfig;
// };

module.exports = ({ config, mode }) => {
  config.module.rules = config.module.rules.map(rule => {
    if (!rule.test.test('.svg')) {
      return rule
    }

    const newRule = rule
    // Changes existing default rule to not handle SVG files
    newRule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/
    return newRule
  })

  // Adds new SVG loader
  config.module.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack', 'url-loader'],
  })

  return config
}
