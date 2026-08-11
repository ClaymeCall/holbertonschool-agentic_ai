<script setup>
import CoolBackground from '../ui/CoolBackground.vue';
import SectionBadge from '../ui/SectionBadge.vue';
import SectionTitle from '../ui/SectionTitle.vue';
import Button from '../ui/Button.vue';
import StatCard from '../cards/StatCard.vue';

const stats = [
  { stat: 'Active agents', value: '10K+' },
  { stat: 'Uptime', value: '99.9%' },
  { stat: 'Tasks automated', value: '50M+' },
  { stat: 'Support', value: '24/7' },
];
</script>

<template>
  <section
    id="hero-section"
    class="relative flex flex-col items-center pt-36 pb-24"
  >
    <CoolBackground />

    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>The future of AI</SectionBadge>
      <hgroup class="flex flex-col items-center">
        <SectionTitle
          level="h1"
          type="big"
          text1="Build smarter workflows"
          text2="with Agentic AI"
          className="mb-8"
        />
        <p class="w-8/10 text-center">
          Create autonomous AI agents that think, plan and execute complex
          tasks. Transform your business with intelligent automation.
        </p>
      </hgroup>
      <div class="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
        <Button variant="primary">
          Start learning with Holberton School
        </Button>
        <Button variant="secondary">Methodology</Button>
      </div>
      <dl class="mt-8 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
        <StatCard v-for="stat in stats" :key="stat.stat" :stat="stat.stat" :value="stat.value" />
      </dl>
    </div>
  </section>
</template>
