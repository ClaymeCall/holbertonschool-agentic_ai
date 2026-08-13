<script>
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import InsightCard from "../cards/InsightCard.svelte";
  import getInsights from "../../services/insightsService.js";
  import { onMount } from "svelte";

  let insights = [];
  let errorMessage = null;

  onMount(async () => {
    try {
      insights = await getInsights();
    } catch (err) {
      errorMessage = err.message;
    }
  });
</script>

{#if errorMessage}
  <div class="text-red-500">{errorMessage}</div>
{:else if insights && insights.length > 0}
  <section id="insights-section" class="flex flex-col items-center pb-24">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>Insights</SectionBadge>

      <SectionTitle
        level="h2"
        text1="Explore Agentic AI"
        text2="Through real-world scenes"
      />

      <div
        class="mt-12 grid place-items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {#each insights as insight, i (i)}
          <InsightCard
            category={insight.category}
            description={insight.description}
            image={insight.image}
            index={i}
            title={insight.title}
          />
        {/each}
      </div>
    </div>
  </section>
{/if}
