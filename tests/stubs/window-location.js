/**
 *
 * @param url
 */
export const stubWindowLocation = url => {
  global.window = Object.create(window)

  Object.defineProperty(window, 'location', {
    value: {
      href: url
    }
  })
}
