import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { parseJson } from '@/utilities/json'
import App from '@/content-scripts/App'
import flushPromises from 'flush-promises'

jest.mock('@/utilities/session')

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

  it('shows the user an input field when a shortcut is pressed', async () => {
    const wrapper = mountApp()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBeTruthy()
  })

  it('hides the input when esc is pressed', async () => {
    const wrapper = mountApp()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBe(true)

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Escape'
      })
    )

    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBe(false)
  })

  it('shows the user a list of shortcuts based on the current url', async () => {
    const session = require('@/utilities/session')

    const stubsPath = __dirname + '/../../stubs/shortcuts/'
    const stub = parseJson(`${stubsPath}/google-sheets-a.json`)
    await session.store(`ccb/shortcuts`, [stub])

    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://sheets.google.com'
      }
    })

    const wrapper = mountApp()

    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'p',
        ctrlKey: true,
        metaKey: true
      })
    )

    await nextTick()
    await flushPromises()

    expect(wrapper.text()).toContain('Bold')
  })
})
