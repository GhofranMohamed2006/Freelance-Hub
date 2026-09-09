export function Stat({ value, label }) {
  return (
    <div>
      <div className="text-xl font-black">{value}</div>
      <div className="text-[9px] text-indigo-200/80">{label}</div>
    </div>
  );
}
