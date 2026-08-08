import SectionBadge from "../ui/SectionBadge.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import steps from "../../data/steps.js";

export default function About() {
  return (
    <section id="about-section" className="flex flex-col items-center py-24">
       <div className="mx-auto max-w-6xl px-6">
         <SectionBadge>What is Agentic AI?</SectionBadge>

          <hgroup className="mb-10 flex flex-col items-center">
            <SectionTitle level="h2" text1="AI that does more than answer" text2="It acts with purpose" className="mb-10" />
          <p className="w-8/10 max-w-2xl pb-8">
            Agentic AI refers to artificial intelligence systems designed to
            pursue goals, make decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single
            prompt, an AI agent can break down a task, plan a strategy, execute
            actions, evaluate results, and continue until the objective is
            reached.
          </p>
        </hgroup>

        <div className="mt-8 grid items-center justify-center gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="h-fit w-full rounded-3xl border border-slate-500/50 bg-slate-950 p-7">
            <dl>
              <dt className="pb-2 text-lg font-bold">Traditional AI</dt>
              <dd className="text-sm text-slate-500">
                Responds to direct instructions, generates content, answers
                questions, or analyzes information within limited interaction.
              </dd>
            </dl>
            <hr className="my-5 text-slate-500/50" />
            <dl>
              <dt className="pb-2 text-lg font-bold text-violet-300">
                Agentic AI
              </dt>
              <dd className="text-sm text-slate-500">
                Understands a goal, chooses actions, uses external tools, follows
                a plan, and adjusts its behaviour based on feedback.
              </dd>
            </dl>
          </div>

          <div className="relative w-full">
            <div className="absolute top-4 bottom-4 left-4 -z-1 w-px bg-gradient-to-b from-violet-500 to-transparent" />
            <ol className="flex-col">
              {steps.map((step) => (
                <li key={step.number} className="flex gap-8 pb-5">
                  <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-black shadow-lg shadow-violet-500/40">
                    {step.number}
                  </div>
                  <div className="pt-3">
                    <h3 className="font-bold text-slate-50">{step.title}</h3>
                    <p className="text-sm text-slate-300">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
