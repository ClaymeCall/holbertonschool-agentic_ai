<script>
  export let level = "h2";
  export let type = "normal";
  export let text1 = "Text 1";
  export let text2 = "Text2";
  export let className = "";

  let size;
  switch (type) {
    case "big":
      size = "text-4xl sm:text-5xl md:text-7xl";
      break;
    case "normal":
    default:
      size = "text-4xl md:text-5xl";
      break;
  }

  const fullClassName = `text-center leading-none font-black tracking-tight ${size} ${className}`;
</script>

{#if level === "h1"}
  <h1 class={fullClassName}>
    <p class="text-slate-50">{text1}</p>
    <p class="text-violet-300">{text2}</p>
  </h1>
{:else if level === "h2"}
  <h2 class={fullClassName}>
    <p class="text-slate-50">{text1}</p>
    <p class="text-violet-300">{text2}</p>
  </h2>
{:else if level === "h3"}
  <h3 class={fullClassName}>
    <p class="text-slate-50">{text1}</p>
    <p class="text-violet-300">{text2}</p>
  </h3>
{:else}
  <h2 class={fullClassName}>
    <p class="text-slate-50">{text1}</p>
    <p class="text-violet-300">{text2}</p>
  </h2>
{/if}
