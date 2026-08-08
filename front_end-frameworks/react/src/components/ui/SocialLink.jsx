function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-8 items-center justify-center rounded-lg border border-slate-800 bg-black transition-colors hover:bg-slate-800"
    >
      {children}
    </a>
  );
}

export default SocialLink;
