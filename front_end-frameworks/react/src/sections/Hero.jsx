import {ArrowRight,} from 'lucide-react';
import Eyebrow from '../components/Eyebrow.jsx'

const stats = [
  {stat: "Active agents", value: "10K+"},
  {stat: "Uptime", value: "99.9%"},
  {stat: "Tasks automated", value: "50M+"},
  {stat: "Support", value: "24/7"},
]

export default function Hero() {
  return (
    <section id="hero-section" className="
      bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)]
      bg-[size:72px_72px]
      flex
      flex-col
      items-center
      pt-36
      pb-24
      ">
      <Eyebrow>The future of AI</Eyebrow>
      <hgroup className="mb-10 flex flex-col items-center">
        <h1 className="mb-10 text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-none text-center">
          <p className="text-slate-50">
            Build smarter workflows
          </p>
          <p className="text-violet-300">
            with Agentic AI
          </p>
        </h1>
        <p className="w-8/10 text-center">
          Create autonomous AI agents that think, plan and execute complex tasks. Transform your business with intelligent automation.
        </p>
      </hgroup>
      <div className="mb-15 flex flex-col md:flex-row gap-4 justify-center items-center">
        <a className="w-fit flex gap-1 items-center px-4 py-2 font-semibold rounded-md bg-violet-500 hover:bg-violet-600 shadow-lg shadow-violet-500/40">
          Start learning with Holberton School
          <ArrowRight />
        </a>
        <a className="w-fit px-4 py-2 font-semibold rounded-md border border-slate-800 bg-slate-950 hover:bg-slate-900">
          Methodology
        </a>
      </div>
      <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({stat, value}) => (
          <div key={stat} className="flex flex-col-reverse items-center align-center text-center p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
            <dt className="text-slate-500">
              {stat}
            </dt>
            <dd className="text-violet-300 font-black text-5xl">
              {value}
            </dd>
          </div>
        ))}
        <div></div>
      </dl>
    </section>
  );
}
