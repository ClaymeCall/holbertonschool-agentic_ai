import React from "react";
import Eyebrow from "../components/Eyebrow.jsx";
import InsightCard from "../components/InsightCard.jsx";
import getInsights from "../services/insightsService.js";

export default function Insights() {
  const [insights, setInsights] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState([]);

  React.useEffect(() => {
    getInsights().then(setInsights);
  }, []);

  if (insights.length === 0) return null;

  return (
    <section id="insights-section" className="flex flex-col items-center py-24">
      <Eyebrow>Insights</Eyebrow>

      <h2 className="mb-24 text-center text-4xl leading-none font-black tracking-tight md:text-5xl">
        <p className="text-slate-50">Explore Agentic AI</p>
        <p className="text-violet-300">Through real-world scenes</p>
      </h2>

      <div className="grid place-items-stretch gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {insights.map((insight, index) => (
          <InsightCard
            index={index}
            key={insight.category}
            image={insight.image}
            category={insight.category}
            title={insight.title}
            description={insight.description}
          />
        ))}
      </div>
    </section>
  );
}
