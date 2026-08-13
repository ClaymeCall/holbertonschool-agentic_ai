<script>
  import { FolderCode, Sparkles, Users } from "lucide-svelte";

  export let icon;

  function selectIcon(icon) {
    switch (icon) {
      case "FolderCode":
        return FolderCode;
      case "Sparkles":
        return Sparkles;
      case "Users":
        return Users;
      default:
        return null;
    }
  }

  const IconComponent = selectIcon(icon);
</script>

<div class="flex gap-2">
  {#if IconComponent}
    <svelte:component this={IconComponent} class="m-auto size-4 stroke-violet-500" />
  {/if}
  <p class="text-sm text-slate-500"><slot /></p>
</div>
