<script>
  import CoolBackground from "../ui/CoolBackground.svelte";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import Button from "../ui/Button.svelte";
  import StatCard from "../cards/StatCard.svelte";

  const stats = [
    { stat: "Active agents", value: "10K+" },
    { stat: "Uptime", value: "99.9%" },
    { stat: "Tasks automated", value: "50M+" },
    { stat: "Support", value: "24/7" },
  ];
</script>

<section
  id="hero-section"
  class="relative flex flex-col items-center pt-36 pb-24"
>
  <CoolBackground />

  <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
    <SectionBadge>The future of coding</SectionBadge>
    <hgroup class="flex flex-col items-center">
      <SectionTitle
        className="mb-8"
        level="h1"
        text1="Build smarter workflows"
        text2="with Agentic AI"
        type="big"
      />
      <p class="w-8/10 text-center">
        Create autonomous AI agents that think, plan and execute complex tasks.
        Transform your business with intelligent automation.
      </p>
    </hgroup>
    <div
      class="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row"
    >
      <Button href="#" variant="primary">
        Start learning with Holberton School
      </Button>
      <Button href="#" variant="secondary">Methodology</Button>
    </div>
    <dl class="mt-8 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
      {#each stats as { stat, value }, i (i)}
        <StatCard {stat} {value} />
      {/each}
    </dl>
  </div>
</section>
