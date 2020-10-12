<template>
  <div v-if="show" class="chrome-cmd-bar-container">
    <div class="chrome-cmd-bar-card">
      <Listbox v-model="selectedResult">
        <ListboxButton v-model="term" :as="SearchInput" />
        <nav-tips />
        <transition
          leave-to-class="_opacity-0"
          leave-from-class="_opacity-100"
          leave-active-class="_transition _ease-in _duration-100"
        >
          <div class="_z-20 _relative _grid _gap-6 _bg-white _px-2 _py-6" v-if="results.length">
            <ListboxOptions static>
              <!-- Disabled options will be skipped by keyboard navigation. -->
              <ListboxOption
                :key="i"
                :value="result"
                v-slot="{ active }"
                v-for="(result, i) in results"
              >
                <search-result :result="result" :active="active" />
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
import { Listbox, ListboxOptions, ListboxButton, ListboxOption } from '@headlessui/vue'

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
