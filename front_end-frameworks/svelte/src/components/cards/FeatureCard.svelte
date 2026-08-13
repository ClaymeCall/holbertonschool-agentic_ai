<script>
  import {
    Bot,
    Brain,
    ShieldCheck,
    Wrench,
    Database,
    Workflow,
  } from "lucide-svelte";

  export let icon;
  export let title = "Feature Title";
  export let description = "Feature Description";

  const styling = "size-5";

  function selectIcon(icon) {
    switch (icon) {
      case "Bot":
        return Bot;
      case "Brain":
        return Brain;
      case "ShieldCheck":
        return ShieldCheck;
      case "Wrench":
        return Wrench;
      case "Database":
        return Database;
      case "Workflow":
        return Workflow;
      default:
        return null;
    }
  }

  const IconComponent = selectIcon(icon);
</script>

<article class="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
  <div class="mb-5 flex size-8 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
    {#if IconComponent}
      <svelte:component this={IconComponent} class={styling} />
    {/if}
  </div>
  <h3 class="mb-2 font-bold">{title}</h3>

  <p class="text-sm text-slate-500">{description}</p>
</article>
