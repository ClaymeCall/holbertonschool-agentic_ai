<script setup>
import { ref, computed } from 'vue';
import { User, AtSign, Mail } from 'lucide-vue-next';
import SectionBadge from '../ui/SectionBadge.vue';
import SectionTitle from '../ui/SectionTitle.vue';
import CoolBackground from '../ui/CoolBackground.vue';
import Button from '../ui/Button.vue';
import Highlight from '../ui/Highlight.vue';

function validateName(name) {
  return name.length >= 2;
}

function validateEmail(email) {
  return email.includes('@') && email.includes('.');
}

function validateMessage(message) {
  return message.length >= 10;
}

function validateForm(nameValue, emailValue, messageValue) {
  return (
    validateName(nameValue) &&
    validateEmail(emailValue) &&
    validateMessage(messageValue)
  );
}

const nameValue = ref('');
const emailValue = ref('');
const messageValue = ref('');
const sendingState = ref('Send message');
const feedbackMessage = ref('Please fill all required fields.');

const isFormValid = computed(() => validateForm(nameValue.value, emailValue.value, messageValue.value));

const handleFormSubmit = (submitEvent) => {
  submitEvent.preventDefault();
  sendingState.value = 'Sending...';
  feedbackMessage.value = 'Sending message...';

  setTimeout(() => {
    nameValue.value = '';
    emailValue.value = '';
    messageValue.value = '';

    sendingState.value = 'Send message';
    feedbackMessage.value = 'Your message has been sent successfully.';

    setTimeout(
      () => feedbackMessage.value = 'Please fill all required fields.',
      5000,
    );
  }, 3000);
};
</script>

<template>
  <section
    id="contact-section"
    class="relative flex flex-col items-center gap-8 py-24"
  >
    <CoolBackground />

    <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
      <SectionBadge>Start your AI journey</SectionBadge>

      <SectionTitle
        level="h2"
        type="big"
        text1="Ready to Explore"
        text2="Agentic AI?"
      />

      <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button variant="primary">Enroll at Holberton School</Button>
        <Button variant="secondary">Need more information?</Button>
      </div>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-8">
        <Highlight icon="FolderCode">Project-based learning </Highlight>
        <Highlight icon="Users">Peer learning environment</Highlight>
        <Highlight icon="Sparkles">AI-powered workflows</Highlight>
      </div>

      <form
        class="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
        @submit="handleFormSubmit"
      >
        <div class="flex w-full flex-col items-start gap-2">
          <label
            for="name"
            class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          >
            <User class="m-auto size-4 stroke-violet-500" />
            <p class="text-sm text-slate-50">Full name</p>
          </label>
          <input
            id="name"
            required
            autocomplete="off"
            placeholder="Your full name..."
            v-model="nameValue"
            :class="`w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none ${
              validateName(nameValue)
                ? 'focus:border-violet-500'
                : 'focus:border-red-500'
            }`"
          />
        </div>

        <div class="flex w-full flex-col items-start gap-2">
          <label
            for="email"
            class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          >
            <AtSign class="m-auto size-4 stroke-violet-500" />
            <p class="text-sm text-slate-50">Email</p>
          </label>
          <input
            id="email"
            required
            autocomplete="off"
            placeholder="you@example.com"
            v-model="emailValue"
            :class="`w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none ${
              validateEmail(emailValue)
                ? 'focus:border-violet-500'
                : 'focus:border-red-500'
            }`"
          />
        </div>

        <div class="flex w-full flex-col items-start gap-2">
          <label
            for="message"
            class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          >
            <Mail class="m-auto size-4 stroke-violet-500" />
            <p class="text-sm text-slate-50">Message</p>
          </label>
          <textarea
            id="message"
            required
            autocomplete="off"
            placeholder="Tell us about you projects or learning goals!"
            v-model="messageValue"
            :class="`min-h-32 w-full resize-none rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none ${
              validateMessage(messageValue)
                ? 'focus:border-violet-500'
                : 'focus:border-red-500'
            }`"
          />
        </div>
        <button
          type="submit"
          :disabled="!isFormValid || sendingState !== 'Send message'"
          class="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 transition hover:bg-violet-600 disabled:opacity-60"
        >
          {{ sendingState }}
        </button>
        <p class="min-h-5 text-sm text-slate-500 transition">
          {{ feedbackMessage }}
        </p>
      </form>
    </div>
  </section>
</template>
