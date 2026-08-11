<script setup>
const props = defineProps({
  stat: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="flex flex-col-reverse rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40">
    <dt :key="stat" class="text-center text-xs text-slate-500">
      {{ stat }}
    </dt>
    <dd class="text-center text-4xl font-black text-violet-300">
      {{ value }}
    </dd>
  </div>
</template>
