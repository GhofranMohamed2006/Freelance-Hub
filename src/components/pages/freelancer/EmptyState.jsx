export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="mt-4 font-semibold text-slate-800">{title}</h3>

      <p className="mt-1 max-w-md text-sm leading-6 text-slate-400">
        {description}
      </p>
    </div>
  );
}