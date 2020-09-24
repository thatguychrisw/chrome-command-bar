<template>
  <div v-if="show" class="flex items-center justify-center h-screen w-screen z-50 absolute top-0 left-0">
    <input class="p-4 w-1/2 text-2xl text-black rounded border-indigo-400 border-2"/>
  </div>
</template>

<script>
export default {
  name: 'CommandBar',
  props: [
    'show'
  ]
}
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
