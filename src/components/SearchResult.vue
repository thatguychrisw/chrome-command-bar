<template>
  <button :class="[{ active }, 'result-element _space-x-4']">
    <svg
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      class="_flex-shrink-0 _h-6 _w-6 _text-gray-600"
    >
      <path
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
    <div class="_space-y-1 _-mt-1">
      <p class="_text-base _leading-6 _font-medium _text-gray-900">
        {{ result.label }}
      </p>
      <p class="_text-sm _leading-5 _text-gray-500">
        <span class="usage-badge" :key="event.name + ii" v-for="(event, ii) in result.events">
          {{ event.name }}
        </span>
      </p>
    </div>
  </button>
</template>

<script>
export default {
  name: 'SearchResult',
  props: {
    result: {
      type: Object,
      default: () => {}
    },

    active: Boolean
  }
}
</script>

<style lang="postcss" scoped>
.result-element {
  @apply _p-3 _flex _items-start _rounded-lg _transition _ease-in-out _duration-150 _text-left _w-full;
}
.result-element:hover,
.result-element:focus,
.result-element.active {
  @apply _bg-gray-100 _shadow-sm;
}
</style>
