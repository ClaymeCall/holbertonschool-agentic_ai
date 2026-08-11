export default function SectionBadge({
  children = "Section Badge default text",
}) {
  return (
    <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-xs text-violet-300">
      <span className="block text-[8px]">✦</span>
      <span>{children}</span>
      <span className="block text-[8px]">✦</span>
    </div>
  );
}
