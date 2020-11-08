import { resolveAppShortcuts } from '@/utilities/app-shortcut-resolver'
import { readFileSync } from 'fs'

describe('app-shortcut-resolver', () => {
  const stubsPath = __dirname + '/../../stubs/shortcuts/'

  it('provides a list of shortcuts based on a url', () => {
    const stub = parseJson(`${stubsPath}/google-sheets-a.json`)

    const appShortcuts = resolveAppShortcuts('https://sheets.google.com', [stub])

    expect(appShortcuts[0]).toBeTruthy()
    expect(appShortcuts[0].label).toEqual(stub.shortcuts[0].label)
  })
})

/**
 * @param path
 * @returns {Object}
 */
const parseJson = path => JSON.parse(readFileSync(path))
