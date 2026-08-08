import React from "react";
import { User, AtSign, Mail } from "lucide-react";
import SectionBadge from "../ui/SectionBadge.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import CoolBackground from "../ui/CoolBackground.jsx";
import Button from "../ui/Button.jsx";
import Highlight from "../ui/Highlight.jsx";

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

export default function Contact() {
  const [nameValue, setNameValue] = React.useState("");
  const [emailValue, setEmailValue] = React.useState("");
  const [messageValue, setMessageValue] = React.useState("");
  const [sendingState, setSendingStateValue] = React.useState("Send message");
  const [feedbackMessage, setFeedbackMessage] = React.useState(
    "Please fill all required fields.",
  );

  const isFormValid = validateForm(nameValue, emailValue, messageValue);

  const handleFormSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    setSendingStateValue("Sending...");
    setFeedbackMessage("Sending message...");

    setTimeout(() => {
      setNameValue("");
      setEmailValue("");
      setMessageValue("");

      setSendingStateValue("Send message");
      setFeedbackMessage("Your message has been sent successfully.");

      setTimeout(
        () => setFeedbackMessage("Please fill all required fields."),
        5000,
      );
    }, 3000);
  };

  return (
    <section
      id="contact-section"
      className="relative flex flex-col items-center gap-8 py-24"
    >
      <CoolBackground />

      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6">
        <SectionBadge>Start your AI journey</SectionBadge>

        <SectionTitle
          level="h2"
          type="big"
          text1="Ready to Explore"
          text2="Agentic AI?"
        />

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button variant="primary">Enroll at Holberton School</Button>
          <Button variant="secondary">Need more information?</Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <Highlight icon="FolderCode">Project-based learning </Highlight>
          <Highlight icon="Users">Peer learning environment</Highlight>
          <Highlight icon="Sparkles">AI-powered workflows</Highlight>
        </div>

        <form
          className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur"
          onSubmit={handleFormSubmit}
        >
          <div className="flex w-full flex-col items-start gap-2">
            <label
              htmlFor="name"
              className="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
            >
              <User className="m-auto size-4 stroke-violet-500" />
              <p className="text-sm text-slate-50">Full name</p>
            </label>
            <input
              id="name"
              required
              autoComplete="off"
              placeholder="Your full name..."
              value={nameValue}
              onChange={(event) => setNameValue(event.target.value)}
              className={`w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none ${
                validateName(nameValue)
                  ? "focus:border-violet-500"
                  : "focus:border-red-500"
              }`}
            />
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <label
              htmlFor="email"
              className="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
            >
              <AtSign className="m-auto size-4 stroke-violet-500" />
              <p className="text-sm text-slate-50">Email</p>
            </label>
            <input
              id="email"
              required
              autoComplete="off"
              placeholder="you@example.com"
              value={emailValue}
              onChange={(event) => setEmailValue(event.target.value)}
              className={`w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none ${
                validateEmail(emailValue)
                  ? "focus:border-violet-500"
                  : "focus:border-red-500"
              }`}
            />
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <label
              htmlFor="message"
              className="ms-2 flex flex-row items-center justify-start gap-2 text-sm font-semibold"
            >
              <Mail className="m-auto size-4 stroke-violet-500" />
              <p className="text-sm text-slate-50">Message</p>
            </label>
            <textarea
              id="message"
              required
              autoComplete="off"
              placeholder="Tell us about you projects or learning goals!"
              value={messageValue}
              onChange={(event) => setMessageValue(event.target.value)}
              className={`min-h-32 w-full resize-none rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:outline-none ${
                validateMessage(messageValue)
                  ? "focus:border-violet-500"
                  : "focus:border-red-500"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={!isFormValid || sendingState !== "Send message"}
            className="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 shadow-lg shadow-violet-500/40 transition hover:bg-violet-600 disabled:opacity-60"
          >
            {sendingState}
          </button>
          <p className="min-h-5 text-sm text-slate-500 transition">
            {feedbackMessage}
          </p>
        </form>
      </div>
    </section>
  );
}
