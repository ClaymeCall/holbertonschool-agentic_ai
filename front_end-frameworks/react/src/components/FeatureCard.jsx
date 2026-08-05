import {
  Bot,
  Brain,
  ShieldCheck,
  Wrench,
  Database,
  Workflow,
} from "lucide-react";

function selectIcon(icon) {
  switch (icon) {
    case "Bot":
      return <Bot />;
    case "Brain":
      return <Brain />;
    case "ShieldCheck":
      return <ShieldCheck />;
    case "Wrench":
      return <Wrench />;
    case "Database":
      return <Database />;
    case "Workflow":
      return <Workflow />;
    default:
      return null;
  }
}

export default function FeatureCard({
  icon,
  title = "Feature Title",
  description = "Feature Description",
}) {
  return (
    <article className="rounded-3xl border border-slate-800 bg-slate-950 p-8 shadow-xl shadow-slate-950/40">
      <div className="mb-5 flex size-10 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
        {selectIcon(icon)}
      </div>
      <h3 className="mb-2 font-bold">{title}</h3>

      <p className="text-slate-500">{description}</p>
    </article>
  );
}
