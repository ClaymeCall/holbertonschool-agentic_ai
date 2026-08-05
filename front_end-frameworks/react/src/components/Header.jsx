import { BrainCircuit } from "lucide-react";

export default function Header() {
  const navLinks = [
    { href: "#about-section", label: "About" },
    { href: "#features-section", label: "Features" },
    { href: "#insights-section", label: "Insights" },
    { href: "#contact-section", label: "Contact" },
  ];

  return (
    <header className="fixed flex w-full justify-between bg-slate-950 p-5 md:px-15">
      <div className="flex items-center gap-2">
        <div className="rounded-xl bg-violet-500 p-2 shadow-lg shadow-violet-500/40">
          <BrainCircuit />
        </div>
        <span className="font-bold text-slate-50">Agentic AI</span>
      </div>

      <nav className="flex items-center gap-4 text-slate-500">
        <div className="hidden md:flex">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              className="rounded-md px-4 py-2 hover:bg-black"
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
    </header>
  );
}
