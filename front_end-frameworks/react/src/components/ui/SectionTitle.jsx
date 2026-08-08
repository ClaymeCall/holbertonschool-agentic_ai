export default function SectionTitle({
  level = "h2",
  type = "normal",
  text1 = "Text 1",
  text2 = "Text2",
  className = "",
}) {
  let size;
  switch (type) {
    case "big":
      size = "text-4xl sm:text-5xl md:text-7xl";
      break;
    case "normal":
    default:
      size = "text-4xl md:text-5xl";
      break;
  }

  const LevelTag = level;

  return (
    <LevelTag
      className={`text-center leading-none font-black tracking-tight ${size} ${className}`}
    >
      <p className="text-slate-50">{text1}</p>
      <p className="text-violet-300">{text2}</p>
    </LevelTag>
  );
}
