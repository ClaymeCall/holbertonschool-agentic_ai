export default function LinkList({ title, links }) {
  return (
    <div className="flex flex-col justify-left">
      <h3 className="mb-4 font-bold text-sm">
        {title}
      </h3>
      <ul className="flex flex-col gap-2 text-xs text-slate-500">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.link}>
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
