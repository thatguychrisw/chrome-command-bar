import { shallowMount } from '@vue/test-utils'
import { h } from 'vue'
import useCommandBarShortcut from '@/composables/useCommandBarShortcut'

const mountComposable = () => {
  let commandBarShortcut

  shallowMount({
    setup() {
      commandBarShortcut = useCommandBarShortcut()

      return () => h('div')
    }
  })

  return commandBarShortcut
}

describe('useCommandBarShortcut', () => {
  it('sets a boolean when a combination of keys are pressed', () => {
    const { showCommandBar } = mountComposable()

    expect(showCommandBar.value).toBe(false)

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )
    expect(showCommandBar.value).toBe(true)
  })

  it('sets a boolean when the escape key is pressed', () => {
    const { showCommandBar } = mountComposable()

    expect(showCommandBar.value).toBe(false)

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )
    expect(showCommandBar.value).toBe(true)

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape'
      })
    )
    expect(showCommandBar.value).toBe(false)
  })
})
