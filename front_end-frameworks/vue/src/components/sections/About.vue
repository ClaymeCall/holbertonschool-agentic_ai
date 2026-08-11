<script setup>
import SectionBadge from '../ui/SectionBadge.vue';
import SectionTitle from '../ui/SectionTitle.vue';
import steps from '../../data/steps.js';
</script>

<template>
  <section id="about-section" class="flex flex-col items-center py-24">
    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>What is Agentic AI?</SectionBadge>

      <hgroup class="flex flex-col items-center gap-8">
        <SectionTitle
          level="h2"
          text1="AI that does more than answer"
          text2="It acts with purpose"
        />
        <p class="w-8/10 max-w-2xl text-start">
          Agentic AI refers to artificial intelligence systems designed to
          pursue goals, make decisions, use tools, and adapt their actions
          across multiple steps. Instead of only responding to a single
          prompt, an AI agent can break down a task, plan a strategy, execute
          actions, evaluate results, and continue until the objective is
          reached.
        </p>
      </hgroup>

      <div class="mt-8 grid items-center justify-center gap-8 md:grid-cols-[1fr_1.2fr]">
        <div class="h-fit w-full rounded-3xl border border-slate-500/50 bg-slate-950 p-7">
          <dl>
            <dt class="pb-2 text-lg font-bold">Traditional AI</dt>
            <dd class="text-sm text-slate-500">
              Responds to direct instructions, generates content, answers
              questions, or analyzes information within limited interaction.
            </dd>
          </dl>
          <hr class="my-5 text-slate-500/50" />
          <dl>
            <dt class="pb-2 text-lg font-bold text-violet-300">
              Agentic AI
            </dt>
            <dd class="text-sm text-slate-500">
              Understands a goal, chooses actions, uses external tools,
              follows a plan, and adjusts its behaviour based on feedback.
            </dd>
          </dl>
        </div>

        <div class="relative w-full">
          <div class="absolute top-4 bottom-4 left-4 -z-1 w-px bg-gradient-to-b from-violet-500 to-transparent" />
          <ol class="flex-col">
            <li v-for="step in steps" :key="step.number" class="flex gap-8 pb-5">
              <div class="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-black shadow-lg shadow-violet-500/40">
                {{ step.number }}
              </div>
              <div class="pt-3">
                <h3 class="font-bold text-slate-50">{{ step.title }}</h3>
                <p class="text-sm text-slate-300">{{ step.description }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>
