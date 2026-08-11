<script setup>
import { FolderCode, Sparkles, Users } from 'lucide-vue-next';

const props = defineProps({
  icon: {
    type: String,
    required: true
  }
});

const iconComponents = {
  FolderCode,
  Sparkles,
  Users
};

const selectedIcon = iconComponents[props.icon];
</script>

<template>
  <div class="flex gap-2">
    <component :is="selectedIcon" v-if="selectedIcon" class="m-auto size-4 stroke-violet-500" />
    <p class="text-sm text-slate-500"><slot></slot></p>
  </div>
</template>
