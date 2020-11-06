import ky from 'ky'
import session from '@/services/session'

window.session = session

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

    await session.store(`ccb/shortcuts/${manifestShortcut}`, prettifyJson(shortcut))

    return shortcut
  })

  await session.store('ccb/shortcuts', prettifyJson(await Promise.all(shortcuts)))

  console.log('stored shortcuts in local storage', await session.get('ccb/shortcuts'))
}

/**
 * @returns {Promise<Object>}
 */
const cacheShortcutManifest = async () => {
  console.log('caching shortcut manifest')

  const manifest = await ky
    .get('https://chrome-command-bar.netlify.app/manifest/shortcut-manifest.json')
    .json()

  await session.store('ccb/shortcut-manifest', prettifyJson(manifest))

  console.log(
    'stored shortcut manifest in local storage',
    await session.get('ccb/shortcut-manifest')
  )

  return manifest
}
