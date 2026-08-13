<script>
  export let title;
  export let links;
</script>

<div class="justify-left flex flex-col">
  <h3 class="mb-4 text-sm font-bold">{title}</h3>
  <ul class="flex flex-col gap-2 text-xs text-slate-500">
    {#each links as link, i (i)}
      <li>
        <a href={link.link}>{link.text}</a>
      </li>
    {/each}
  </ul>
</div>
