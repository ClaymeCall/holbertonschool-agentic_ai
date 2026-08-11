<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  links: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div class="justify-left flex flex-col">
    <h3 class="mb-4 text-sm font-bold">{{ title }}</h3>
    <ul class="flex flex-col gap-2 text-xs text-slate-500">
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.link">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>
