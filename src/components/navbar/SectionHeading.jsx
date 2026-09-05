import { ChevronRight } from "lucide-react";

export function SectionHeading({ title, subtitle, action }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[10px] text-slate-400">{subtitle}</p>
        )}
      </div>

      {action && (
        <a
          href="#freelancers"
          className="hidden items-center gap-1 text-[10px] font-bold text-indigo-600 sm:flex"
        >
          {action}
          <ChevronRight className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}