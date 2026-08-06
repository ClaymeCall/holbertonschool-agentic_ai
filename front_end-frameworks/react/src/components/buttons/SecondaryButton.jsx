export default function SecondaryButton({children = "Default text"}) {
  return (
          <a className="w-fit rounded-md border border-slate-800 bg-slate-950 px-4 py-2 font-semibold hover:bg-slate-900">
            {children}
          </a>
  );
}
