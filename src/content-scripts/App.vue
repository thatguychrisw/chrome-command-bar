<template>
  <command-bar :show="showCommandBar" />
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

<style lang="postcss">
/** Custom css */
.usage-badge {
  @apply _inline-block _bg-blue-100 _px-2 _rounded-md;
}
</style>
