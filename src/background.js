import ky from 'ky'

const prettifyJson = obj => JSON.stringify(obj, null, 2)

// schedules
chrome.alarms.create('cache-shortcuts', { delayInMinutes: 1, periodInMinutes: 1 })

// listeners
chrome.alarms.onAlarm.addListener(async alarm => {
  await cacheShortcutManifest(alarm)
})

const cacheShortcutManifest = async alarm => {
  if (alarm.name !== 'cache-shortcuts') return

  console.log('caching shortcut manifest')

  const manifest = await ky
    .get('https://chrome-command-bar.netlify.app/shortcut-manifest.json')
    .json()

  localStorage.setItem('ccb-shortcut-manifest', prettifyJson(manifest))

  console.log('stored shortcut manifest in local storage')

  return manifest
}
