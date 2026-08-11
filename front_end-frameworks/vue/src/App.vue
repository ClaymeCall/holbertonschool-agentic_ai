<script setup>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import Hero from './components/sections/Hero.vue';
import About from './components/sections/About.vue';
import Features from './components/sections/Features.vue';
import Insights from './components/sections/Insights.vue';
import Contact from './components/sections/Contact.vue';
</script>

<template>
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
</template>
