import { BrainCircuit } from "lucide-react";

export default function Header() {
  const navLinks = [
    { href: "#about-section", label: "About" },
    { href: "#features-section", label: "Features" },
    { href: "#insights-section", label: "Insights" },
    { href: "#contact-section", label: "Contact" },
  ];

  return (
    <header className="fixed flex w-full z-1000 bg-slate-950 px-5 py-3">
      <div className="flex w-full justify-between mx-auto max-w-6xl px-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 flex flex-row justify-center items-center text-xs font-black rounded-lg bg-violet-500 shadow-lg shadow-violet-500/40">
            <BrainCircuit className="size-4"/>
          </div>
          <span className="font-bold text-slate-50 text-sm">Agentic AI</span>
        </div>

        <nav className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex text-slate-500">
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
