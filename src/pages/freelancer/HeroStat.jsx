
export function HeroStat({ icon, value, label }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3 text-center">
      <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-white text-indigo-500 shadow-sm [&>svg]:h-3.5 [&>svg]:w-3.5">
        {icon}
      </div>
      <div className="mt-2 text-xs font-black text-slate-800">{value}</div>
      <div className="text-[7px] font-bold tracking-wide text-slate-400">
        {label}
      </div>
    </div>
  );
}
