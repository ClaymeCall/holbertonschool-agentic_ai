<script setup>
const props = defineProps({
  href: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="label"
    class="flex size-8 items-center justify-center rounded-lg border border-slate-800 bg-black transition-colors hover:bg-slate-800"
  >
    <slot></slot>
  </a>
</template>
