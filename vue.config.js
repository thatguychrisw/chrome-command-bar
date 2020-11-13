module.exports = {
  pages: {
    options: {
      template: 'public/browser-extension.html',
      entry: './src/options/main.js',
      title: 'Options'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'command-bar-event-emitter': 'src/content-scripts/command-bar-event-emitter.js',
            'content-script': ['src/content-scripts/content-script.js']
          }
        }
      }
    }
  }
}
