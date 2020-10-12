import { mount } from '@vue/test-utils'
import App from '@/content-scripts/App'

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
})
