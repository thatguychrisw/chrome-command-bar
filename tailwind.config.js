const defaultTheme = require('tailwindcss/defaultTheme')

const convertRemsToEms = config => {
  Object.keys(config).map(key => (config[key] = config[key].replace('rem', 'em')))

  return config
}

const fontSize = convertRemsToEms(defaultTheme.fontSize)
const lineHeight = convertRemsToEms(defaultTheme.lineHeight)

module.exports = {
  important: true,
  prefix: '_',
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  // corePlugins: { preflight: false },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        maven: ['Maven Pro', 'Sans-serif']
      },
      fontSize,
      lineHeight,
      zIndex: {
        max: '10000'
      }
    }
  },
  variants: {},
  plugins: []
}
