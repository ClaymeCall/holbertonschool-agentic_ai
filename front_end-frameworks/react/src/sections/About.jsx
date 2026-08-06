import Eyebrow from "../components/Eyebrow.jsx";
import steps from "../data/steps.js";

export default function About() {
  return (
    <section id="about-section" className="flex flex-col items-center py-24">

      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow>What is Agentic AI?</Eyebrow>

        <hgroup className="mb-10 flex flex-col items-center">
          <h2 className="mb-10 text-center text-4xl leading-none font-black tracking-tight md:text-5xl">
            <p className="text-slate-50">AI that does more than answer</p>
            <p className="text-violet-300">It acts with purpose</p>
          </h2>
          <p className="max-w-2xl w-8/10 pb-8">
            Agentic AI refers to artificial intelligence systems designed to
            pursue goals, make decisions, use tools, and adapt their actions
            across multiple steps. Instead of only responding to a single prompt,
            an AI agent can break down a task, plan a strategy, execute actions,
            evaluate results, and continue until the objective is reached.
          </p>
        </hgroup>

        <div className="flex w-full flex-col items-center gap-10 sm:flex-row">
          <dl className="w-full mb-10 h-fit flex-shrink-5 rounded-3xl border border-slate-500/50 bg-slate-950 p-7">
            <dt className="pb-2 text-lg font-bold">Traditional AI</dt>
            <dd className="text-slate-500 text-sm">
              Responds to direct instructions, generates content, answers
              questions, or analyzes information within limited interaction.
            </dd>
            <hr className="my-5 text-slate-500/50" />
            <dt className="pb-2 text-lg font-bold text-violet-300">Agentic AI</dt>
            <dd className="text-slate-500 text-sm">
              Understands a goal, chooses actions, uses external tools, follows
              a plan, and adjusts its behaviour based on feedback.
            </dd>
          </dl>

          <ol className="relative flex flex-shrink-1 flex-col">
            <div className="absolute -z-1 left-4 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500 to-transparent" />
            {steps.map((step) => (
              <li key={step.number} className="flex gap-8 pb-5">
                <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-black shadow-lg shadow-violet-500/40">
                  {step.number}
                </div>
                <div className="pt-3">
                  <h3 className="font-bold text-slate-50">{step.title}</h3>
                  <p className="text-slate-300 text-sm">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
