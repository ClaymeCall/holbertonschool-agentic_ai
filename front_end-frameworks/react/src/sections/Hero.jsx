import {ArrowRight} from 'lucide-react';

const stats = [
  {stat: "Active agents", value: "10K+"},
  {stat: "Uptime", value: "99.9%"},
  {stat: "Tasks automated", value: "50M+"},
  {stat: "Support", value: "24/7"},
]
export default function Hero() {
  return (
    <section id="hero-section" className="h-[var(--header-height)]">
      <div> The future of coding</div>
      <hgroup>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          Build smarter workflows with Agentic AI
        </h1>
        <p>
          Create autonomous AI agents that think, plan and execute complex tasks. Transform your business with intelligent automation.
        </p>
      </hgroup>
      <div>
        <a>
          Start learning with Holberton School
        </a>
      </div>
      <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {stats.map(({stat, value}) => (
          <div key={stat} className="flex flex-col-reverse">
            <dt>
              {stat}
            </dt>
            <dd>
              {value}
            </dd>
          </div>
        ))}
        <div></div>
      </dl>
    </section>
  );
}
