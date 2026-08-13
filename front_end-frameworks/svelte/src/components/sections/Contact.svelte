<script>
  import { User, AtSign, Mail } from "lucide-svelte";
  import SectionBadge from "../ui/SectionBadge.svelte";
  import SectionTitle from "../ui/SectionTitle.svelte";
  import CoolBackground from "../ui/CoolBackground.svelte";
  import Button from "../ui/Button.svelte";
  import Highlight from "../ui/Highlight.svelte";

  function validateName(name) {
    return name.length >= 2;
  }

  function validateEmail(email) {
    return email.includes("@") && email.includes(".");
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

  let nameValue = "";
  let emailValue = "";
  let messageValue = "";
  let sendingState = "Send message";
  let feedbackMessage = "Please fill all required fields.";

  $: isFormValid = validateForm(nameValue, emailValue, messageValue);

  function handleFormSubmit(submitEvent) {
    submitEvent.preventDefault();
    sendingState = "Sending...";
    feedbackMessage = "Sending message...";

    setTimeout(() => {
      nameValue = "";
      emailValue = "";
      messageValue = "";

      sendingState = "Send message";
      feedbackMessage = "Your message has been sent successfully.";

      setTimeout(
        () => (feedbackMessage = "Please fill all required fields."),
        5000,
      );
    }, 3000);
  }
</script>

<section
  id="contact-section"
  class="relative flex flex-col items-center gap-8 py-24"
>
  <CoolBackground />

  <div class="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
    <SectionBadge>Start your AI journey</SectionBadge>

    <SectionTitle
      level="h2"
      text1="Ready to Explore"
      text2="Agentic AI?"
      type="big"
    />

    <div
      class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
    >
      <Button variant="primary">Enroll at Holberton School</Button>
      <Button variant="secondary">Need more information?</Button>
    </div>

    <div class="mt-8 flex flex-wrap items-center justify-center gap-8">
      <Highlight icon="FolderCode">Project-based learning</Highlight>
      <Highlight icon="Users">Peer learning environment</Highlight>
      <Highlight icon="Sparkles">AI-powered workflows</Highlight>
    </div>

    <form
      class="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
      on:submit|preventDefault={handleFormSubmit}
    >
      <div class="flex w-full flex-col items-start gap-2">
        <label
          class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          for="name"
        >
          <User class="m-auto size-4 stroke-violet-500" />
          <p class="text-sm text-slate-50">Full name</p>
        </label>
        <input
          id="name"
          class="w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none"
          class:focus:border-red-500={!validateName(nameValue)}
          class:focus:border-violet-500={validateName(nameValue)}
          autoComplete="off"
          placeholder="Your full name..."
          required
          bind:value={nameValue}
        />
      </div>

      <div class="flex w-full flex-col items-start gap-2">
        <label
          class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          for="email"
        >
          <AtSign class="m-auto size-4 stroke-violet-500" />
          <p class="text-sm text-slate-50">Email</p>
        </label>
        <input
          id="email"
          class="w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none"
          class:focus:border-red-500={!validateEmail(emailValue)}
          class:focus:border-violet-500={validateEmail(emailValue)}
          autoComplete="off"
          placeholder="you@example.com"
          required
          bind:value={emailValue}
        />
      </div>

      <div class="flex w-full flex-col items-start gap-2">
        <label
          class="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
          for="message"
        >
          <Mail class="m-auto size-4 stroke-violet-500" />
          <p class="text-sm text-slate-50">Message</p>
        </label>
        <textarea
          id="message"
          class="min-h-32 w-full resize-none rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none"
          class:focus:border-red-500={!validateMessage(messageValue)}
          class:focus:border-violet-500={validateMessage(messageValue)}
          autoComplete="off"
          placeholder="Tell us about you projects or learning goals!"
          required
          bind:value={messageValue}></textarea>
      </div>
      <button
        class="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 transition hover:bg-violet-600 disabled:opacity-60"
        disabled={!isFormValid || sendingState !== "Send message"}
        type="submit"
      >
        {sendingState}
      </button>
      <p class="min-h-5 text-sm text-slate-500 transition">
        {feedbackMessage}
      </p>
    </form>
  </div>
</section>
