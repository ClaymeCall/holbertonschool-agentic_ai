export default function StatCard({ stat, value }) {
  return (
    <div className="p-6 rounded-xl border border-slate-800 bg-slate-950 shadow-xl shadow-slate-950/40">
      <dt key={stat} className="text-xs text-slate-500 text-center">{stat}</dt>
      <dd className="text-4xl font-black text-violet-300 text-center">{value}</dd>
    </div>
  );
}