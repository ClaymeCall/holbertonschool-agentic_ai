<script setup>
const props = defineProps({
  level: {
    type: String,
    default: 'h2'
  },
  type: {
    type: String,
    default: 'normal'
  },
  text1: {
    type: String,
    default: 'Text 1'
  },
  text2: {
    type: String,
    default: 'Text2'
  },
  className: {
    type: String,
    default: ''
  }
});

const size = props.type === 'big' ? 'text-4xl sm:text-5xl md:text-7xl' : 'text-4xl md:text-5xl';
</script>

<template>
  <component :is="level" :class="`text-center leading-none font-black tracking-tight ${size} ${className}`">
    <p class="text-slate-50">{{ text1 }}</p>
    <p class="text-violet-300">{{ text2 }}</p>
  </component>
</template>
