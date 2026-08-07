import { BrainCircuit } from "lucide-react";

export default function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2">
      <div className="flex h-7 w-7 flex-row items-center justify-center rounded-lg bg-violet-500 text-xs font-black shadow-lg shadow-violet-500/40">
        <BrainCircuit className="size-4" />
      </div>
      <span className="text-sm font-bold text-slate-50">Agentic AI</span>
    </a>
  );
}
