import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { stubWindowLocation } from '../../stubs/window-location'
import { storeShortcutStubs } from '../../stubs/session-shortcuts'
import App from '@/content-scripts/App'
import flushPromises from 'flush-promises'
import SearchInput from '@/components/SearchInput'

describe('Content-Scripts — App Component', () => {
  const mountApp = options => {
    const mountOptions = Object.assign(
      {
        global: {
          directives: {
            focus: jest.fn()
          }
        }
      },
      options
    )

    return mount(App, mountOptions)
  }

  const emitShowAppShortcutEvent = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )
  }

  const emitHideAppShortcutEvent = () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape'
      })
    )
  }

  it('shows the user an input field when a shortcut is pressed', async () => {
    const wrapper = mountApp()

    emitShowAppShortcutEvent()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('hides the input when esc is pressed', async () => {
    const wrapper = mountApp()

    emitShowAppShortcutEvent()

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBe(true)

    emitHideAppShortcutEvent()

    await nextTick()

    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('shows the user a list of shortcuts based on the current url', async () => {
    const stub = (await storeShortcutStubs('google-sheets-single.json'))[0]

    stubWindowLocation('https://sheets.google.com')

    const wrapper = mountApp()

    emitShowAppShortcutEvent()

    await nextTick()
    await flushPromises()

    expect(wrapper.text()).toContain(stub.shortcuts[0].label)
  })

  it('filters a list of shortcuts when the user searches', async () => {
    await storeShortcutStubs('google-sheets-multiple.json')

    stubWindowLocation('https://sheets.google.com')

    const wrapper = mountApp()

    emitShowAppShortcutEvent()

    await nextTick()
    await flushPromises()

    expect(wrapper.text()).toContain('Bold Text')
    expect(wrapper.text()).toContain('Underline Text')

    await wrapper
      .findComponent(SearchInput)
      .find('input')
      .setValue('Bold')

    await nextTick()

    expect(wrapper.text()).toContain('Bold Text')
    expect(wrapper.text()).not.toContain('Underline Text')
  })
})
