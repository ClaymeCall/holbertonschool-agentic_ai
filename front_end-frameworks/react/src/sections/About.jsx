import {Dot} from 'lucide-react';
import Eyebrow from '../components/Eyebrow.jsx'

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
    </section>
  );
}
