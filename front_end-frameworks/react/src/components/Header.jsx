import { BrainCircuit } from "lucide-react";

export default function Header() {
  const navLinks = [
    { href: "#about-section", label: "About" },
    { href: "#features-section", label: "Features" },
    { href: "#insights-section", label: "Insights" },
    { href: "#contact-section", label: "Contact" },
  ];

  return (
    <header className="fixed z-1000 flex w-full bg-slate-950 px-5 py-3">
      <div className="mx-auto flex w-full max-w-6xl justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 flex-row items-center justify-center rounded-lg bg-violet-500 text-xs font-black shadow-lg shadow-violet-500/40">
            <BrainCircuit className="size-4" />
          </div>
          <span className="text-sm font-bold text-slate-50">Agentic AI</span>
        </div>

        <nav className="flex items-center gap-4 text-xs">
          <div className="hidden text-slate-500 md:flex">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                className="rounded-md px-4 py-2 hover:text-slate-50"
                href={href}
              >
                {label}
              </a>
            ))}
          </div>
          <a
            href=""
            className="rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600"
          >
            Enroll now
          </a>
        </nav>
      </div>
    </header>
  );
}
