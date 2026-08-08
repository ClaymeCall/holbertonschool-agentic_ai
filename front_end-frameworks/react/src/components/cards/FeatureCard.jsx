import {
  Bot,
  Brain,
  ShieldCheck,
  Wrench,
  Database,
  Workflow,
} from "lucide-react";

function selectIcon(icon) {
  const styling = "size-5";
  switch (icon) {
    case "Bot":
      return <Bot className={styling}/>;
    case "Brain":
      return <Brain className={styling}/>;
    case "ShieldCheck":
      return <ShieldCheck className={styling}/>;
    case "Wrench":
      return <Wrench className={styling}/>;
    case "Database":
      return <Database className={styling}/>;
    case "Workflow":
      return <Workflow className={styling}/>;
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
      <div className="mb-5 flex size-8 items-center justify-center rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
        {selectIcon(icon)}
      </div>
      <h3 className="mb-2 font-bold">{title}</h3>

      <p className="text-slate-500 text-sm">{description}</p>
    </article>
  );
}
