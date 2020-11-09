import { parseJson } from '@/utilities/json'
import session from '@/utilities/session'
const stubsPath = __dirname + '/shortcuts'

// eslint-disable-next-line no-undef
jest.mock('@/utilities/session')

export const storeShortcutStubs = async stubs => {
  if (!Array.isArray(stubs)) stubs = [stubs]

  const shortcuts = stubs.map(stub => parseJson(`${stubsPath}/${stub}`))

  await session.store(`ccb/shortcuts`, shortcuts)

  return shortcuts
}
