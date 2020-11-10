/**
 *
 * @param shortcut
 * @returns {null}
 */
export function emitShortcutEvent(shortcut) {
  if (!shortcut.events.length) {
    return null
  }

  shortcut.events.forEach(event => {
    document.dispatchEvent(createEvent(event))
  })
}

const createEvent = event => {
  let created = null

  switch (event.type) {
    case 'KeyboardEvent':
      created = createKeyboardEvent(event)
      break
  }

  return created
}

const createKeyboardEvent = event => {
  return new KeyboardEvent(event.name, event.options)
}
