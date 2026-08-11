<script setup>
import { Bot, Brain, ShieldCheck, Wrench, Database, Workflow } from 'lucide-vue-next';

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Feature Title'
  },
  description: {
    type: String,
    default: 'Feature Description'
  }
});

const iconComponents = {
  Bot,
  Brain,
  ShieldCheck,
  Wrench,
  Database,
  Workflow
};

const selectedIcon = iconComponents[props.icon];
</script>

<template>
  <article class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
    <div class="mb-5 flex size-8 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
      <component :is="selectedIcon" v-if="selectedIcon" class="size-5" />
    </div>
    <h3 class="mb-2 font-bold">{{ title }}</h3>
    <p class="text-sm text-slate-500">{{ description }}</p>
  </article>
</template>
