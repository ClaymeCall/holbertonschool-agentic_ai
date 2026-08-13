<script>
  import Header from "./components/layout/Header.svelte";
  import Footer from "./components/layout/Footer.svelte";
  import Hero from "./components/sections/Hero.svelte";
  import About from "./components/sections/About.svelte";
  import Features from "./components/sections/Features.svelte";
  import Insights from "./components/sections/Insights.svelte";
  import Contact from "./components/sections/Contact.svelte";
</script>

<div class="flex min-h-screen flex-col">
  <Header />
  <main class="">
    <Hero />
    <About />
    <Features />
    <Insights />
    <Contact />
  </main>
  <Footer />
</div>
