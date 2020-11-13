import { emitShortcutEvent } from '@/utilities/shortcut-event-emitter'
import { parseJson } from '@/utilities/json'

describe('shortcut-emitter', () => {
  it('emits keyboard events related to a shortcut', () => {
    const stubsPath = __dirname + '/../../stubs/shortcuts'
    const shortcut = parseJson(`${stubsPath}/google-sheets-single.json`).shortcuts[0]

    global.document.dispatchEvent = jest.fn()

    emitShortcutEvent(shortcut)

    expect(global.document.dispatchEvent).toHaveBeenCalledTimes(1)
    expectShortcutFired(shortcut)
  })
})

const expectShortcutFired = shortcut => {
  shortcut.events.forEach((event, i) => {
    const keyboardEvent = global.document.dispatchEvent.mock.calls[i][0]

    expect(keyboardEvent.type).toEqual(event.name)
    expect(keyboardEvent.key).toEqual(event.options.key)
  })
}
