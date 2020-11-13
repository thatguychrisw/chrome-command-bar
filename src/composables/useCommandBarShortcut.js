import { ref, onMounted } from 'vue'

export default function useCommandBarShortcut() {
  const showCommandBar = ref(false)

  onMounted(() => {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
      showCommandBar.value = request.shouldBarBeVisible

      // respond to the background page
      sendResponse(showCommandBar.value)
    })

    document.addEventListener('hide-command-bar', () => {
      showCommandBar.value = false
    })
  })

  return {
    showCommandBar
  }
}
