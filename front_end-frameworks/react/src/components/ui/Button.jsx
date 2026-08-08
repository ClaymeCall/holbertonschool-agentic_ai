import { ArrowRight } from "lucide-react";

export default function Button({
  variant = "primary",
  children = "Default text",
}) {
  switch (variant) {
    case "primary":
      return (
        <a className="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
          {children}
          <ArrowRight className="stroke-width-2 size-3" />
        </a>
      );
    case "secondary":
      return (
        <a className="w-fit rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900">
          {children}
        </a>
      );
    default:
      return (
        <a className="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
          {children}
          <ArrowRight className="stroke-width-2 size-3" />
        </a>
      );
  }
}
