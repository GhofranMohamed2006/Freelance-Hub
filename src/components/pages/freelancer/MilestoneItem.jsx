
export default function MilestoneItem({ milestone, index, onToggle }) {
  const completed = milestone.status?.toLowerCase() === "completed";
  const active = milestone.status?.toLowerCase() === "in progress";

  return (
    <div
      className={`rounded-2xl p-5 ${
        active ? "bg-indigo-50" : "bg-white ring-1 ring-slate-100"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
            completed || active
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-slate-400"
          }`}
        >
          {index + 1}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">{milestone.title}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {milestone.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  completed
                    ? "bg-indigo-100 text-indigo-700"
                    : active
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-100 text-slate-500"
                }`}
              >
                {milestone.status || "Pending"}
              </span>

              <span className="font-semibold">
                ${Number(milestone.amount || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {!completed && (
            <button
              type="button"
              onClick={() => onToggle(milestone.id, "Completed")}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
