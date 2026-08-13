<script>
  import { ArrowRight } from "lucide-svelte";

  export let variant = "primary";
  export let href = "#";
</script>

{#if variant === "primary"}
  <a class="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600" href={href}>
    <slot>Default text</slot>
    <ArrowRight class="stroke-width-2 size-3" />
  </a>
{:else if variant === "secondary"}
  <a class="w-fit rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900" href={href}>
    <slot>Default text</slot>
  </a>
{:else}
  <a class="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600" href={href}>
    <slot>Default text</slot>
    <ArrowRight class="stroke-width-2 size-3" />
  </a>
{/if}
