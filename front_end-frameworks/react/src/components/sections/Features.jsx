import SectionBadge from "../ui/SectionBadge.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import FeatureCard from "../cards/FeatureCard.jsx";
import features from "../../data/features.js";

export default function Features() {
  return (
    <section id="features-section" className="flex flex-col items-center pb-24">
       <div className="mx-auto max-w-6xl px-6">
          <SectionBadge>Features</SectionBadge>

          <SectionTitle level="h2" text1="Everything You Need to Build" text2="With powerful AI agents" className="mb-24" />

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
      </div>
    </section>
  );
}
