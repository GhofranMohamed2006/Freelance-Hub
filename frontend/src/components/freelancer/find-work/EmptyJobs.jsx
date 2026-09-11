import { FiSearch } from "react-icons/fi";

const EmptyJobs = ({ onClear }) => {
    return (
        <div className="rounded-2xl bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-100">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                <FiSearch className="h-7 w-7 text-indigo-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
                No projects found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Try changing your search or clearing some filters to discover
                more opportunities.
            </p>

            <button
                type="button"
                onClick={onClear}
                className="
                    mt-6
                    rounded-xl
                    bg-indigo-600
                    px-5 py-3
                    text-sm font-semibold text-white
                    transition
                    hover:bg-indigo-700
                "
            >
                Clear Filters
            </button>
        </div>
    );
};

export default EmptyJobs;