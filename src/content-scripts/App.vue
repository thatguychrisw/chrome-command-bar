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
  mounted () {
    console.log('app loaded')

    window.addEventListener('keydown', (e) => {
      console.log('pressed', e)

      if (e.metaKey && e.ctrlKey && e.key === 'p') {
        console.log('show command bar')

        this.show = true
      }

      if (e.key === "Escape") {
        console.log('hide command bar')

        this.show = false
      }
    });
  }
}
</script>

<style>
</style>
