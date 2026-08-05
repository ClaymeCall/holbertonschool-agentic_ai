import Eyebrow from "../components/Eyebrow.jsx";
import FeatureCard from "../components/FeatureCard.jsx";
import features from "../data/features.js";

export default function Features() {
  return (
    <section id="features-section" className="flex flex-col items-center py-24">
      <Eyebrow>Features</Eyebrow>

      <h2 className="mb-24 text-center text-4xl leading-none font-black tracking-tight md:text-5xl">
        <p className="text-slate-50">Everything You Need to Build</p>
        <p className="text-violet-300">With powerful AI agents</p>
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
