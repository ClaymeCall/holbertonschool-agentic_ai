import { FolderCode, Sparkles, Users } from "lucide-react";

function selectIcon(icon) {
  switch (icon) {
    case "FolderCode":
      return <FolderCode className="m-auto size-4 stroke-violet-500" />;
    case "Sparkles":
      return <Sparkles className="m-auto size-4 stroke-violet-500" />;
    case "Users":
      return <Users className="m-auto size-4 stroke-violet-500" />;
    default:
      return null;
  }
}

export default function Highlight({ icon, children }) {
  return (
    <div className="flex gap-2">
      {selectIcon(icon)}
      <p className="text-sm text-slate-500">{children}</p>
    </div>
  );
}
