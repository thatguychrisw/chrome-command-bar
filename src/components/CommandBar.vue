<template>
  <div v-if="show" class="chrome-cmd-bar-container">
    <div class="chrome-cmd-bar-card">
      <Listbox v-model="selectedResult">
        <ListboxButton v-model="term" :as="SearchInput" />
        <nav-tips />
        <transition
          leave-active-class="_transition _ease-in _duration-100"
          leave-from-class="_opacity-100"
          leave-to-class="_opacity-0"
        >
          <div class="_z-20 _relative _grid _gap-6 _bg-white _px-2 _py-6">
            <ListboxOptions static>
              <!-- Disabled options will be skipped by keyboard navigation. -->
              <ListboxOption
                v-for="(result, i) in shownShortcuts"
                :key="i"
                v-slot="{ active }"
                :value="result"
              >
                <search-result :active="active" :result="result" />
              </ListboxOption>
            </ListboxOptions>
          </div>
        </transition>
      </Listbox>

      <div>{{ term }} {{ selectedResult }}</div>
    </div>
  </div>
</template>

<script>
import session from '@/utilities/session'
import { resolveAppShortcuts } from '@/utilities/app-shortcut-resolver'
import { Listbox, ListboxOptions, ListboxButton, ListboxOption } from '@headlessui/vue'
import Fuse from 'fuse.js'

import NavTips from './NavTips'
import SearchInput from './SearchInput'
import SearchResult from './SearchResult'

export default {
  name: 'CommandBar',
  components: {
    NavTips,
    Listbox,
    SearchResult,
    ListboxOption,
    ListboxButton,
    ListboxOptions
  },
  props: ['show'],
  data: () => ({
    SearchInput,

    term: '',
    selectedResult: {},
    shortcuts: [],
    shortcutLabels: {}
  }),

  methods: {
    searchForShortcuts(term) {
      return this.shortcutLabels.search(term).reduce((shortcuts, result) => {
        shortcuts.push(result.item)

        return shortcuts
      }, [])
    }
  },
  computed: {
    shownShortcuts: function() {
      if (!this.term) {
        return this.shortcuts
      }

      const shortcuts = this.searchForShortcuts(this.term)

      return shortcuts.length === 0 ? [{ label: 'No results found' }] : shortcuts
    }
  },
  async mounted() {
    const shortcuts = await session.get('ccb/shortcuts')

    if (!shortcuts) return // need to fetch live from the web at this point; it hasn't been cached
    console.log('shortcuts', shortcuts)

    const appShortcuts = resolveAppShortcuts(window.location.href, shortcuts)

    console.log('app shortcuts', appShortcuts)

    this.shortcuts = appShortcuts

    this.shortcutLabels = new Fuse(this.shortcuts, {
      ignoreLocation: true,
      ignoreFieldNorm: true,
      threshold: 0,
      keys: ['label']
    })
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

*:focus {
  @apply outline-none;
}
</style>
