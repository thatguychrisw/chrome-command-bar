<template>
  <div class="_flex _w-full _relative">
    <input
      v-focus
      :value="modelValue"
      placeholder="Find your shortcut..."
      @input="$emit('update:modelValue', $event.target.value)"
      class="_p-4 _w-full _text-2xl _text-gray-800 _outline-none _border-gray-200 _border-solid _border-b focus:_border-gray-400"
    />
    <svg
      class="_self-center _mr-4 _absolute _right-0 _text-gray-300 _h-6 _w-6 _fill-current"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56.966 56.966"
      width="512"
      height="512"
    >
      <path
        d="M55.146 51.887L41.588 37.786A22.926 22.926 0 0046.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 00.083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: ['modelValue']
}
</script>
