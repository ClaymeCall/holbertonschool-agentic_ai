<script>
  export let href;
  export let label;
</script>

<a
  class="flex size-8 items-center justify-center rounded-lg border border-slate-800 bg-black transition-colors hover:bg-slate-800"
  aria-label={label}
  href={href}
  rel="noopener noreferrer"
  target="_blank"
>
  <slot />
</a>
