import { Astroid } from "lucide-react";

export default function Eyebrow({ children = "Eyebrow default text" }) {
  return (
    <div className="mb-10 flex w-fit items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
      <Astroid className="size-2 fill-violet-300" />
      <span>{children}</span>
      <Astroid className="size-2 fill-violet-300" />
    </div>
  );
}
