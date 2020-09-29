<template>
  <div v-if="show" class="chrome-cmd-bar-container">
    <div class="chrome-cmd-bar-card">
      <search-input v-model="term" />
      <nav-tips />
      <search-results :results="results" @select="fireEvent" />
    </div>
  </div>
</template>

<script>
import NavTips from './NavTips'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'

export default {
  name: 'CommandBar',
  components: { NavTips, SearchInput, SearchResults },
  props: ['show'],
  data: () => ({
    term: '',
    results: [
      {
        label: 'Create New Issue',
        events: [
          {
            type: 'string[KeyboardEvent|Event]',
            name: 'cmd + shift + i',
            options: {}
          }
        ]
      },

      {
        label: 'Create New PR',
        events: [
          {
            type: 'string[KeyboardEvent|Event]',
            name: 'cmd + shift + p',
            options: {}
          }
        ]
      }
    ]
  }),

  methods: {
    fireEvent(shortcut) {
      console.log(shortcut)
    }
  }
}
</script>

<style scoped lang="postcss">
.chrome-cmd-bar-container {
  @apply _flex _items-start _justify-center _h-screen _w-screen _z-max _fixed _top-0 _left-0 _bg-white _bg-opacity-75 _font-maven;
}
.chrome-cmd-bar-card {
  @apply _w-2/3 _max-w-screen-lg _overflow-hidden _shadow-xl _bg-white _relative _mt-32 _border-gray-100 _border _border-solid _rounded-lg;
}
</style>
