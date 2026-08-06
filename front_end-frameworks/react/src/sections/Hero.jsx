import { ArrowRight } from "lucide-react";
import CoolBackground from "../components/CoolBackground.jsx";
import Eyebrow from "../components/Eyebrow.jsx";

const stats = [
  { stat: "Active agents", value: "10K+" },
  { stat: "Uptime", value: "99.9%" },
  { stat: "Tasks automated", value: "50M+" },
  { stat: "Support", value: "24/7" },
];

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="pt-36 pb-24"
    >
      <CoolBackground />

      <div className="flex flex-col items-center mx-auto max-w-6xl px-6">
        <Eyebrow>The future of AI</Eyebrow>
        <hgroup className="mb-10 flex flex-col items-center">
          <h1 className="mb-10 text-center text-4xl leading-none font-black tracking-tight sm:text-5xl md:text-7xl">
            <p className="text-slate-50">Build smarter workflows</p>
            <p className="text-violet-300">with Agentic AI</p>
          </h1>
          <p className="w-8/10 text-center">
            Create autonomous AI agents that think, plan and execute complex
            tasks. Transform your business with intelligent automation.
          </p>
        </hgroup>
        <div className="mb-15 flex flex-col items-center justify-center gap-4 md:flex-row">
          <a className="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
            Start learning with Holberton School
            <ArrowRight className="size-3 stroke-width-2"/>
          </a>
          <a className="w-fit rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900">
            Methodology
          </a>
        </div>
        <dl className="grid w-9/10 grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(({ stat, value }) => (
            <div
              key={stat}
              className="align-center flex flex-col-reverse items-center rounded-xl border border-slate-800 bg-slate-950 p-6 gap-1 text-center shadow-xl shadow-slate-950/40"
            >
              <dt className="text-slate-500 text-xs">{stat}</dt>
              <dd className="text-4xl font-black text-violet-300">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
