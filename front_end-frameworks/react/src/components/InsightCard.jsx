export default function InsightCard({
  index,
  category = "Insight Category",
  title = "Insight Title",
  description = "Insight Description",
  image
}) {
  return(
    <article
      className={`
        flex
        flex-col
        ${index === 0 && "sm:col-span-2"}
        p-8
        rounded-3xl
        border
        border-slate-800
        shadow-xl
        shadow-slate-950/40
        bg-[url('${image}')]
        bg-cover
        bg-center
        `}
    >
      <div className="basis-1/2 flex-shrink-0"></div>
      <div className="basis-1/2">
        <div>
          {category}
        </div>
        <h3 className="mb-2 text-2xl font-bold">
          {title}
        </h3>

        <p className="text-slate-500">
          {description}
        </p>

      </div>
    </article>
  );
}
