<script>
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import FeatureCard from "../cards/FeatureCard.svelte";
  import features from "../../data/features.js";
</script>

<section
  id="features-section"
  class="flex scroll-mt-24 flex-col items-center pb-24"
>
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
    <SectionBadge>Features</SectionBadge>
    <SectionTitle
      level="h2"
      text1="Everything You Need to Build"
      text2="With powerful AI agents"
    />
    <div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      {#each features as feature, i (i)}
        <FeatureCard
          description={feature.description}
          icon={feature.icon}
          title={feature.title}
        />
      {/each}
    </div>
  </div>
</section>
