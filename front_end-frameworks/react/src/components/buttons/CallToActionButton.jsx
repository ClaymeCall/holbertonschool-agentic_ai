import { ArrowRight } from "lucide-react";

export default function CallToActionButton({children = "Default text"}) {
  return (
          <a className="flex w-fit items-center gap-1 rounded-md bg-violet-500 px-4 py-2 font-semibold shadow-lg shadow-violet-500/40 hover:bg-violet-600">
            {children}
            <ArrowRight className="size-3 stroke-width-2"/>
          </a>
  )
}
