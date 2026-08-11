<script setup>
import { ArrowRight } from 'lucide-vue-next';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary'
  },
  children: {
    type: String,
    default: 'Default text'
  }
});
</script>

<template>
  <a v-if="variant === 'primary'" class="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
    <slot>{{ children }}</slot>
    <ArrowRight class="stroke-width-2 size-3" />
  </a>
  <a v-else-if="variant === 'secondary'" class="w-fit rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900">
    <slot>{{ children }}</slot>
  </a>
  <a v-else class="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
    <slot>{{ children }}</slot>
    <ArrowRight class="stroke-width-2 size-3" />
  </a>
</template>
