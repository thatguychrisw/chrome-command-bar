import { execSync } from 'child_process'
import { readFileSync, existsSync, unlinkSync } from 'fs'

describe('create:shortcut-manifest', () => {
  const manifestPath = __dirname + '/manifest.json'

  afterEach(() => {
    if (existsSync(manifestPath)) {
      unlinkSync(manifestPath)
    }
  })

  it('creates a single map that relates url patterns to specific file names', () => {
    const stubsPath = __dirname + '/../../stubs/shortcuts/'

    const ranSuccessfully = createShortcutManifest(stubsPath, manifestPath)

    // manifest should exist
    expect(ranSuccessfully).toBeTruthy()
    expect(existsSync(manifestPath)).toBe(true)

    // manifest should be json
    const manifest = parseJson(manifestPath)
    expect(manifest).toBeTruthy()

    // manifest should include the path to a specific stub
    const specificStub = 'google-sheets-a.json'
    const stub = parseJson(`${stubsPath}/${specificStub}`)
    expect(manifest[stub.urlPattern]).toEqual('google-sheets-a.json')
  })

  it('should exit without creating a manifest if no shortcuts are found', () => {
    const stubsPath = __dirname + '/does_not_exist/'

    const ranSuccessfully = createShortcutManifest(stubsPath, manifestPath)

    // manifest should not exist, but the command should still return a valid exit code
    expect(ranSuccessfully).toBeTruthy()
    expect(existsSync(manifestPath)).toBe(false)
  })
})

/**
 *
 * @param path
 * @param output
 * @returns {boolean}
 */
const createShortcutManifest = (path, output) => {
  try {
    const suppressErrors = ['ignore', 'pipe', 'ignore']

    const command = './create-shortcut-manifest.js'

    output = execSync(`${command} -p ${path} -o ${output}`, {
      cwd: __dirname + '/../../../bin',
      stdio: suppressErrors
    })
  } catch (e) {
    output = false
  }

  return !!output
}

/**
 * @param path
 * @returns {Object}
 */
const parseJson = path => JSON.parse(readFileSync(path))
