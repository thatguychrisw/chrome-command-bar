<template>
  <div class="_z-20 _relative _grid _gap-6 _bg-white _px-5 _py-6 sm:_gap-8 sm:_p-8">
    <button
      :key="i"
      type="button"
      v-for="(result, i) in results"
      @click="$emit('select', result)"
      class="_-m-3 _p-3 _flex _items-start _space-x-4 _rounded-lg hover:_bg-gray-100 _transition _ease-in-out _duration-150 _text-left"
    >
      <svg
        class="_flex-shrink-0 _h-6 _w-6 _text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <div class="_space-y-1 _-mt-1">
        <p class="_text-base _leading-6 _font-medium _text-gray-900">
          {{ result.label }}
        </p>
        <p class="_text-sm _leading-5 _text-gray-500">
          <span class="usage-badge" :key="i + ii" v-for="(event, ii) in result.events">
            {{ event.name }}
          </span>
        </p>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  name: 'SearchResults',
  props: {
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>
