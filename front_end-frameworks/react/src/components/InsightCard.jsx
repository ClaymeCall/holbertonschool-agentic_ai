export default function InsightCard({
  index,
  category = "Insight Category",
  title = "Insight Title",
  description = "Insight Description",
  image,
}) {
  return (
    <article
      className={`flex flex-col ${index === 0 && "sm:col-span-2"} rounded-3xl border border-slate-800 py-30 px-8 shadow-xl shadow-slate-950/40 relative overflow-hidden`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full hover:scale-120 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black to-70%"></div>
      <div className="flex-shrink-0 basis-1/2 relative z-10"></div>
      <div className="basis-1/2 relative z-10">
        <div className="bg-violet-500/20 border border-violet-300/50 text-violet-300 py-2 px-5 mb-2 text-xs w-fit rounded-full">
          {category}
        </div>
        <h3 className="mb-2 text-2xl font-bold">{title}</h3>
        <p className="text-slate-500">{description}</p>
      </div>
    </article>
  );
}
