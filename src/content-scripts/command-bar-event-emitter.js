document.addEventListener(
  'keydown',
  e => {
    if (e.key === 'Escape') {
      document.dispatchEvent(new Event('hide-command-bar'))
    }
  },
  true
)
