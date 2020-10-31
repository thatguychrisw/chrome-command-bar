import ky from 'ky'

const prettifyJson = obj => JSON.stringify(obj, null, 2)

// schedules
chrome.alarms.create('cache-shortcuts', { periodInMinutes: 1 })

// listeners
chrome.alarms.onAlarm.addListener(async alarm => {
  await cacheShortcuts(alarm)
})

/**
 * @param alarm
 * @returns {Promise<void>}
 */
const cacheShortcuts = async alarm => {
  if (alarm.name !== 'cache-shortcuts') return

  console.log('caching shortcuts')

  const manifest = await cacheShortcutManifest()

  const shortcuts = Object.keys(manifest).map(async urlPattern => {
    const manifestShortcut = manifest[urlPattern]

    const shortcut = await ky
      .get(`https://chrome-command-bar.netlify.app/shortcuts/${manifestShortcut}`)
      .json()

    localStorage.setItem(`ccb/shortcuts/${manifestShortcut}`, prettifyJson(shortcut))

    return shortcut
  })

  localStorage.setItem('ccb/shortcuts', prettifyJson(await Promise.all(shortcuts)))

  console.log('stored shortcut manifest in local storage')
}

/**
 * @returns {Promise<Object>}
 */
const cacheShortcutManifest = async () => {
  console.log('caching shortcut manifest')

  const manifest = await ky
    .get('https://chrome-command-bar.netlify.app/manifest/shortcut-manifest.json')
    .json()

  localStorage.setItem('ccb/shortcut-manifest', prettifyJson(manifest))

  console.log('stored shortcut manifest in local storage')

  return manifest
}
