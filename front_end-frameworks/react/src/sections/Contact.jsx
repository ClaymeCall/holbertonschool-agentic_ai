import React from "react";
import { User, AtSign, Mail } from "lucide-react";
import { FolderCode, Sparkles, Users } from "lucide-react";
import Eyebrow from "../components/Eyebrow.jsx";
import CoolBackground from "../components/CoolBackground.jsx";
import CallToActionButton from "../components/buttons/CallToActionButton.jsx";
import SecondaryButton from "../components/buttons/SecondaryButton.jsx";

export default function Contact() {
  return (
    <section
      id="contact-section"
      className="relative flex flex-col items-center gap-8 py-24"
    >
      <CoolBackground />

      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>Start your AI journey</Eyebrow>

        <h2 className="text-center text-4xl leading-none font-black tracking-tight sm:text-5xl md:text-7xl">
          <p className="text-slate-50">Ready to Explore</p>
          <p className="text-violet-300">Agentic AI?</p>
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 pb-8 sm:flex-row">
          <CallToActionButton>Enroll at Holberton School</CallToActionButton>
          <SecondaryButton>Need more information?</SecondaryButton>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          <div className="flex gap-2">
            <FolderCode className="m-auto size-4 stroke-violet-500" />
            <p className="text-sm text-slate-500">Project-based learning</p>
          </div>

          <div className="flex gap-2">
            <Users className="m-auto size-4 stroke-violet-500" />
            <p className="text-sm text-slate-500">Peer learning environment</p>
          </div>

          <div className="flex gap-2">
            <Sparkles className="m-auto size-4 stroke-violet-500" />
            <p className="text-sm text-slate-500">AI-powered workflow</p>
          </div>

          <form className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 text-start shadow-2xl shadow-slate-950/40 backdrop-blur">
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
                autocomplete="off"
                placeholder="Your full name..."
                className="w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
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
                autocomplete="off"
                placeholder="you@example.com"
                className="w-full rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
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
                autocomplete="off"
                placeholder="Tell us about you projects or learning goals!"
                className="min-h-32 w-full resize-none rounded-md border border-slate-800 bg-black px-4 py-2 text-sm text-slate-50 shadow-xl shadow-slate-950/40 transition placeholder:text-slate-500 focus:border-violet-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-violet-500 px-4 py-2 font-semibold text-slate-50 opacity-60 shadow-lg shadow-violet-500/40 transition"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
