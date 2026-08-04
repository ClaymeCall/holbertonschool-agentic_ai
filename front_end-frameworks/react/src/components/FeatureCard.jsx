import {Bot, Brain, ShieldCheck, Wrench, Database, Workflow} from 'lucide-react';

function selectIcon(icon) {
  switch(icon) {
    case 'Bot': return <Bot />;
    case 'Brain': return <Brain />;
    case 'ShieldCheck': return <ShieldCheck />;
    case 'Wrench': return <Wrench />;
    case 'Database': return <Database />;
    case 'Workflow': return <Workflow />;
    default: return null;
  }
};

export default function FeatureCard({ icon, title = "Feature Title", description = "Feature Description" }) {
  return(
    <article className="p-8 rounded-3xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
      <div className="flex items-center justify-center size-10 mb-3 bg-violet-500 rounded-lg">
        { selectIcon(icon) }
      </div>
      <h3 className="font-bold">
        {title}
      </h3>

      <p className="text-slate-500">
        {description}
      </p>

    </article>
  );
}
