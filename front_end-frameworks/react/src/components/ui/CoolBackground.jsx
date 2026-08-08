export default function CoolBackground() {
  return (
    <>
      <div className="absolute inset-0 -z-10 border-b border-b-3 border-slate-500 bg-[radial-gradient(circle_at_15%_10%,rgba(168,85,247,0.35),transparent_32%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(135deg,#1e1238_0%,#0f172a_45%,#020617_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.45)_75%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 border-b border-slate-800 bg-gradient-to-b from-transparent to-black" />
    </>
  );
}
