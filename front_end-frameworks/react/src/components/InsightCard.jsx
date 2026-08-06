export default function InsightCard({
  index,
  category = "Insight Category",
  title = "Insight Title",
  description = "Insight Description",
  image,
}) {
  return (
    <article
      className={`flex flex-col ${index === 0 && "sm:col-span-2"} relative overflow-hidden rounded-3xl border border-slate-800 px-8 py-30 shadow-xl shadow-slate-950/40 hover:[&>img]:scale-110 hover:[&>img]:brightness-50`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black to-70%"></div>
      <div className="relative z-10 flex-shrink-0 basis-1/2"></div>
      <div className="relative z-10 basis-1/2">
        <div className="mb-2 w-fit rounded-full border border-violet-300/50 bg-violet-500/20 px-5 py-2 text-xs text-violet-300">
          {category}
        </div>
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        <p className="text-slate-500">{description}</p>
      </div>
    </article>
  );
}
