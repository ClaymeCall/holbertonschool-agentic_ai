import Eyebrow from '../components/Eyebrow.jsx'
import steps from '../data/steps.js'

export default function About() {
  return (
    <section id="about-section" className="flex flex-col items-center py-24">

      <Eyebrow>What is Agentic AI?</Eyebrow>

      <hgroup className="mb-10 flex flex-col items-center">
        <h2 className="mb-10 text-center text-4xl md:text-5xl font-black tracking-tight leading-none">
          <p className="text-slate-50">
            AI that does more than answer
          </p>
          <p className="text-violet-300">
            It acts with purpose
          </p>
        </h2>
        <p className="w-8/10">
          Agentic AI refers to artificial intelligence systems designed to pursue goals, make decisions, use tools, and adapt their actions across multiple steps. Instead of only responding to a single prompt, an AI agent can break down a task, plan a strategy, execute actions, evaluate results, and continue until the objective is reached.
        </p>
      </hgroup>

      <div className="flex flex-col items-center w-full gap-10 sm:flex-row">

        <div className="bg-slate-950 mb-10 p-7 flex-shrink-3 h-fit border border-slate-500 rounded-3xl">
          <dl className="w-full">
            <dt className="pb-2 text-lg font-bold">
              Traditional AI
            </dt>
            <dd className="text-slate-500">
              Responds to direct instructions, generates content, answers questions, or analyzes information within limited interaction.
            </dd>
            <hr className="text-slate-500 my-5" />
            <dt className="text-violet-300 font-bold">
              Agentic AI
            </dt>
            <dd className="text-slate-500">
              Understands a goal, chooses actions, uses external tools, follows a plan, and adjusts its behaviour based on feedback.
            </dd>
          </dl>
        </div>

        <ol className="flex flex-col flex-shrink-2">
          {steps.map((step) => (
            <li key={step.number} className="flex gap-8 pb-5">
              <div className="flex justify-center items-center bg-violet-500 flex-shrink-0 size-8 rounded-full text-xs font-black shadow-lg shadow-violet-500/40">
                {step.number}
              </div>
              <div className="pt-1">
                <h3 className="font-bold text-slate-50">
                  {step.title}
                </h3>
                <p className="text-slate-300">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

      </div>

    </section>
  );
}
