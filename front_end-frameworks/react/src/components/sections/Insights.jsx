import React from "react";
import SectionBadge from "../ui/SectionBadge.jsx";
import SectionTitle from "../ui/SectionTitle.jsx";
import InsightCard from "../cards/InsightCard.jsx";
import getInsights from "../../services/insightsService.js";

export default function Insights() {
  const [insights, setInsights] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  React.useEffect(() => {
    getInsights()
      .then(setInsights)
      .catch((err) => setError(err.message));
  }, []);

  if (errorMessage) return <div className="text-red-500">{errorMessage}</div>;

  if (!insights || insights.length === 0) return null;

  return (
    <section id="insights-section" className="flex flex-col items-center py-24">
       <div className="mx-auto max-w-6xl px-6">
          <SectionBadge>Insights</SectionBadge>

          <SectionTitle level="h2" text1="Explore Agentic AI" text2="Through real-world scenes" className="mb-24" />

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
      </div>
    </section>
  );
}
