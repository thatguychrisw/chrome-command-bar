<template>
  <command-bar :show="showCommandBar"></command-bar>
</template>

<script>
import CommandBar from '@/components/CommandBar'
import useCommandBarShortcut from '@/composables/useCommandBarShortcut'

export default {
  name: 'App',
  components: { CommandBar },
  setup() {
    const { showCommandBar } = useCommandBarShortcut()

    return {
      showCommandBar
    }
  }
}
</script>

<style></style>
