export const money = (value) =>
  `$${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

export const date = (value) => {
  if (!value) return "No deadline";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? "No deadline"
    : d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
};

export const statusClass = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("complete")) return "bg-emerald-50 text-emerald-700";
  if (value.includes("progress") || value.includes("active"))
    return "bg-indigo-50 text-indigo-700";
  if (value.includes("cancel") || value.includes("reject"))
    return "bg-red-50 text-red-600";
  return "bg-slate-100 text-slate-600";
};
