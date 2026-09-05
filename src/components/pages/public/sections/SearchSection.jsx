import { Search } from "lucide-react";

export default function SearchSection({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
  loading,
  error,
}) {
  return (
    <div className="relative z-20 mx-auto w-[calc(100%-40px)] mt-[-120px] max-w-[1280px] translate-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          document
            .querySelector("#freelancers")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_14px_40px_rgba(31,41,55,.08)] md:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-xl bg-slate-50 px-4">
          <Search className="h-4 w-4 shrink-0 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services, skills, or freelancers..."
            className="h-12 w-full bg-transparent text-sm outline-none"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={loading || Boolean(error)}
          className="rounded-xl bg-slate-50 px-4 text-sm font-semibold text-slate-600 outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id || category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="h-12 rounded-xl bg-indigo-600 px-7 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
        >
          Search
        </button>
      </form>
    </div>
  );
}
