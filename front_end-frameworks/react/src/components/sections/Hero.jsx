import CoolBackground from "../ui/CoolBackground.jsx";
import SectionBadge from "../ui/SectionBadge.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import StatCard from "../cards/StatCard.jsx";

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
      className="relative flex flex-col items-center pt-36 pb-24"
    >
       <CoolBackground />

        <div className="mx-auto flex max-w-6xl flex-col items-center px-6 gap-8">
          <SectionBadge>The future of AI</SectionBadge>
          <hgroup className="flex flex-col items-center">
            <SectionTitle level="h1" type="big" text1="Build smarter workflows" text2="with Agentic AI" className="mb-8" />
           <p className="w-8/10 text-center">
             Create autonomous AI agents that think, plan and execute complex
             tasks. Transform your business with intelligent automation.
           </p>
         </hgroup>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row">
            <Button variant="primary">
              Start learning with Holberton School
            </Button>
            <Button variant="secondary">
              Methodology
            </Button>
          </div>
          <dl className="mt-8 grid w-full max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
           {stats.map(({ stat, value }) => (
             <StatCard key={stat} stat={stat} value={value} />
           ))}
         </dl>
      </div>
    </section>
  );
}
