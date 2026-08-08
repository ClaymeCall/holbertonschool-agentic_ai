export default function StatCard({ stat, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-xl shadow-slate-950/40">
      <dt key={stat} className="text-center text-xs text-slate-500">
        {stat}
      </dt>
      <dd className="text-center text-4xl font-black text-violet-300">
        {value}
      </dd>
    </div>
  );
}
