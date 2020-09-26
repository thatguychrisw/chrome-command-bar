<template>
  <command-bar :show="show"></command-bar>
</template>

<script>
import CommandBar from '@/components/CommandBar'
import { ref, onMounted } from 'vue'

export default {
  name: 'App',
  components: {CommandBar},
  setup () {
    const show = ref(false)

    onMounted(() => {
      window.addEventListener('keydown', (e) => {
        if (e.metaKey && e.ctrlKey && e.key === 'p') {
          show.value = true
        }

        if (e.key === 'Escape') {
          show.value = false
        }
      })
    })

    return {
      show
    }
  }
}
</script>

<style>
</style>
