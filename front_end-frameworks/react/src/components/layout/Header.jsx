import Brand from "../ui/Brand.jsx";
import Button from "../ui/Button.jsx";

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
        <Brand />
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
          <Button variant="primary">Enroll now</Button>
        </nav>
      </div>
    </header>
  );
}
