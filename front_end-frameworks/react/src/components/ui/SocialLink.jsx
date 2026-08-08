function SocialLink({ href, label, children }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center justify-center size-8 rounded-lg bg-black border border-slate-800 hover:bg-slate-800 transition-colors"
        >
            {children}
        </a>
    );
}

export default SocialLink;
