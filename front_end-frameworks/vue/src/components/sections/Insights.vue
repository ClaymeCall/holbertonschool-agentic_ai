<script setup>
import { ref, onMounted } from 'vue';
import SectionBadge from '../ui/SectionBadge.vue';
import SectionTitle from '../ui/SectionTitle.vue';
import InsightCard from '../cards/InsightCard.vue';
import getInsights from '../../services/insightsService.js';

const insights = ref([]);
const errorMessage = ref(null);

onMounted(async () => {
  try {
    insights.value = await getInsights();
  } catch (err) {
    errorMessage.value = err.message;
  }
});
</script>

<template>
  <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
  <section v-else-if="insights && insights.length > 0" id="insights-section" class="flex flex-col items-center pb-24">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>Insights</SectionBadge>

      <SectionTitle
        level="h2"
        text1="Explore Agentic AI"
        text2="Through real-world scenes"
      />

      <div class="mt-12 grid place-items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <InsightCard
          v-for="(insight, index) in insights"
          :index="index"
          :key="insight.category"
          :image="insight.image"
          :category="insight.category"
          :title="insight.title"
          :description="insight.description"
        />
      </div>
    </div>
  </section>
</template>
