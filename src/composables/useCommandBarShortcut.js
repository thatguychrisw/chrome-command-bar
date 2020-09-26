import { ref, onMounted } from 'vue'

export default function useCommandBarShortcut () {
  const showCommandBar = ref(false)

  onMounted(() => {
    window.addEventListener('keydown', (e) => {
      if (e.metaKey && e.ctrlKey && e.key === 'p') {
        showCommandBar.value = true
      }

      if (e.key === 'Escape') {
        showCommandBar.value = false
      }
    })
  })

  return {
    showCommandBar
  }
}

