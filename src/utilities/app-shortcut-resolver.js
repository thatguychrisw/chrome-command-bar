/**
 *
 * @param url
 * @param shortcuts
 * @returns {*}
 */
export function resolveAppShortcuts(url, shortcuts) {
  const appShortcuts = shortcuts.reduce((appShortcuts, app) => {
    if (urlMatches(url, app.urlPattern)) {
      appShortcuts = appShortcuts.concat(app.shortcuts)
    }

    return appShortcuts
  }, [])

  return appShortcuts
}

const urlMatches = (target, candidate) => {
  const pattern = candidate.replace(/([.?+^$[\]\\(){}|/-])/g, '\\$1').replace(/\*/g, '.*')
  console.log('comparing', target, pattern)

  return new RegExp(pattern).test(target)
}
