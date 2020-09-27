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
  it('it provides a reference to whether the command bar should show based on if a shortcut is used', () => {
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
})
