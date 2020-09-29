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
      zIndex: {
        max: '10000'
      }
    }
  },
  variants: {},
  plugins: []
}
