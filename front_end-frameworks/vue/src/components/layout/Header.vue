<script setup>
import Brand from '../ui/Brand.vue';
import Button from '../ui/Button.vue';

const navLinks = [
  { href: '#about-section', label: 'About' },
  { href: '#features-section', label: 'Features' },
  { href: '#insights-section', label: 'Insights' },
  { href: '#contact-section', label: 'Contact' },
];
</script>

<template>
  <header class="fixed z-1000 flex w-full bg-slate-950 px-5 py-3">
    <div class="mx-auto flex w-full max-w-6xl justify-between px-6">
      <Brand />
      <nav class="flex items-center gap-4 text-xs">
        <div class="hidden text-slate-500 md:flex">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="rounded-md px-4 py-2 hover:text-slate-50"
          >
            {{ link.label }}
          </a>
        </div>
        <Button variant="primary">Enroll now</Button>
      </nav>
    </div>
  </header>
</template>
