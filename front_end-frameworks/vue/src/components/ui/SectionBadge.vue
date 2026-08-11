<script setup>
import { Star } from 'lucide-vue-next';

const props = defineProps({
  children: {
    type: String,
    default: 'Section Badge default text'
  }
});
</script>

<template>
  <div class="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
    <Star class="size-2 fill-violet-300" />
    <span><slot>{{ children }}</slot></span>
    <Star class="size-2 fill-violet-300" />
  </div>
</template>
