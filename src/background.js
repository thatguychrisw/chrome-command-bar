import ky from 'ky'
import { prettifyJson } from '@/utilities/json'
import session from '@/utilities/session'

// this is for examining the session at runtime
window.session = session

// add the chrome command listener which will trigger the command bar
const addShowCommandBarListener = () => {
  const currentWindowQuery = { active: true, currentWindow: true }

  chrome.commands.onCommand.addListener(function(command) {
    const shouldBarBeVisible = command === 'show-command-bar'

    chrome.tabs.query(currentWindowQuery, tabs => {
      const currentTab = tabs[0].id

      chrome.tabs.sendMessage(currentTab, { shouldBarBeVisible }, response => {
        console.log('response from command-bar', response)
      })
    })
  })
}
addShowCommandBarListener()

// create a scheduled task for caching shortcuts
chrome.alarms.create('cache-shortcuts', { periodInMinutes: 1 })

// create a listener that responds to scheduled tasks
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
