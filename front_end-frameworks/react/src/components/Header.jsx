import {BrainCircuit} from 'lucide-react';

export default function Header() {
  const navLinks = [
    { href: "#about-section", label: "About" },
    { href: "#features-section", label: "Features" },
    { href: "#insights-section", label: "Insights" },
    { href: "#contact-section", label: "Contact" },
  ];

  return (
    <header className="flex justify-between p-5 md:px-15 bg-slate-950 fixed w-full">

      <!-- Logo -->
      <div className="flex items-center gap-2">
        <div className="p-2 bg-violet-500 rounded-xl shadow-lg shadow-violet-500/40">
          <BrainCircuit className="stroke-violet-300"/>
        </div>
        <span className="text-slate-50 font-bold">Agentic AI</span>
      </div>

      <!-- Nav buttons -->
      <nav className="flex gap-4 text-slate-500 items-center">
        <div className="hidden md:flex">
          {navLinks.map(({ href, label }) => (
            <a key={href} className="px-4 py-2 rounded-md hover:bg-black" href={href}>
              {label}
            </a>
          ))}
        </div>
        <a href="" className="px-4 py-2 font-semibold rounded-md bg-violet-500 text-slate-300 hover:bg-violet-600 shadow-lg shadow-violet-500/40">
          Enroll now
        </a>
      </nav>

    </header>
  );
}
