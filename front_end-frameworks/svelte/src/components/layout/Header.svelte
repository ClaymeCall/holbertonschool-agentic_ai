<script>
  import Brand from "../ui/Brand.svelte";
  import Button from "../ui/Button.svelte";

  const navLinks = [
    { href: "#about-section", label: "About" },
    { href: "#features-section", label: "Features" },
    { href: "#insights-section", label: "Insights" },
    { href: "#contact-section", label: "Contact" },
  ];
</script>

<header class="fixed z-1000 flex w-full bg-slate-950 px-5 py-3">
  <div class="mx-auto flex w-full max-w-6xl justify-between px-6">
    <Brand />
    <nav class="flex items-center gap-4 text-xs">
      <div class="hidden text-slate-500 md:flex">
        {#each navLinks as { href, label }, i (i)}
          <a class="rounded-md px-4 py-2 hover:text-slate-50" {href}>
            {label}
          </a>
        {/each}
      </div>
      <Button href="#" variant="primary">Enroll now</Button>
    </nav>
  </div>
</header>
