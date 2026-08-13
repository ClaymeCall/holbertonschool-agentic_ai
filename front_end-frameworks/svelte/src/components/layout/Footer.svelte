<script>
  import Brand from "../ui/Brand.svelte";
  import SocialLink from "../ui/SocialLink.svelte";
  import LinkList from "../ui/LinkList.svelte";

  const linkLists = [
    {
      links: [
        { text: "Hero section", link: "#hero-section" },
        { text: "About", link: "#about-section" },
        { text: "Features", link: "#features-section" },
        { text: "Insights", link: "#insights-section" },
        { text: "Contact", link: "#contact-section" },
      ],
      title: "Navigation",
    },
    {
      links: [
        { text: "About", link: "https://www.holbertonschool.fr" },
        {
          text: "Methodology",
          link: "https://www.holbertonschool.fr/methodologie",
        },
        { text: "Story", link: "https://www.holbertonschool.fr/a-propos" },
        { text: "Agenda", link: "https://www.holbertonschool.fr" },
      ],
      title: "Holberton School",
    },
    {
      links: [
        {
          text: "Bachelor",
          link: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering",
        },
        {
          text: "Program",
          link: "https://www.holbertonschool.fr/programme/bachelor-ai-augmented-software-engineering#programme",
        },
      ],
      title: "Curriculum",
    },
  ];
</script>

<footer class="bg-black px-8 pb-24">
  <div
    class="mx-auto flex max-w-6xl flex-col gap-8 pt-24 pb-12 md:grid md:grid-cols-5"
  >
    <div class="col-span-2 flex flex-col gap-4">
      <Brand />
      <p class="text-xs text-slate-500">
        Explore the future of development with Agentic AI.
      </p>
      <div class="flex gap-2">
        <SocialLink
          href="https://www.instagram.com/holbertonfrance"
          label="Instagram"
        >
          <i class="bi bi-instagram text-base text-slate-300"></i>
        </SocialLink>
        <SocialLink
          href="https://www.tiktok.com/@holbertonfrance"
          label="TikTok"
        >
          <i class="bi bi-tiktok text-base text-slate-300"></i>
        </SocialLink>
        <SocialLink href="https://x.com/holbertonfra" label="X">
          <i class="bi bi-twitter-x text-base text-slate-300"></i>
        </SocialLink>
        <SocialLink
          href="https://www.youtube.com/@HolbertonFrance"
          label="YouTube"
        >
          <i class="bi bi-youtube text-base text-slate-300"></i>
        </SocialLink>
      </div>
    </div>
    {#each linkLists as list, i (i)}
      <LinkList links={list.links} title={list.title} />
    {/each}
  </div>
  <hr class="my-6 text-slate-900" />
  <div
    class="flex flex-col justify-between gap-4 text-xs text-slate-500 sm:flex-row"
  >
    <p>© 2026 Clément Callejon</p>

    <p>Built for the Holberton School Front-end Framework curriculum.</p>
  </div>
</footer>
