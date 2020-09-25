<template>
  <command-bar :show="show"></command-bar>
</template>

<script>
import CommandBar from '@/components/CommandBar'

export default {
  name: 'App',
  components: {CommandBar},
  data () {
    return {
      show: false,
    }
  },
  created () {
    window.addEventListener('keydown', (e) => {
      if (e.metaKey && e.ctrlKey && e.key === 'p') {
        this.show = true
      }

      if (e.key === "Escape") {
        this.show = false
      }
    });
  }
}
</script>

<style>
</style>
