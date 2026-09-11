import { motion } from "framer-motion";
import { FiSearch, FiSliders } from "react-icons/fi";
import CustomDropdown from "./CustomDropdown";

const JobSearch = ({
    search,
    setSearch,
    projectType,
    setProjectType,
    onFiltersClick,
}) => {
    return (
        <motion.div
            className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: 0.15,
                ease: "easeOut",
            }}
        >
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search projects, skills, or keywords..."
                        className="
                            w-full
                            rounded-xl
                            border border-slate-200
                            bg-slate-50
                            py-3.5 pl-12 pr-4
                            text-sm text-slate-800
                            outline-none
                            transition
                            hover:border-indigo-300
                            focus:border-indigo-500
                            focus:bg-white
                            focus:ring-4 focus:ring-indigo-500/10
                        "
                    />
                </div>

                <CustomDropdown
                    value={projectType}
                    onChange={setProjectType}
                    className="lg:w-56"
                    options={[
                        { value: "all", label: "All Project Types" },
                        { value: "fixed", label: "Fixed Price" },
                        { value: "hourly", label: "Hourly" },
                    ]}
                />

                <button
                    type="button"
                    onClick={onFiltersClick}
                    className="
                        flex items-center justify-center gap-2
                        rounded-xl
                        border border-slate-200
                        px-5 py-3
                        text-sm font-semibold text-slate-700
                        transition
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-600
                        lg:hidden
                    "
                >
                    <FiSliders className="h-4 w-4" />
                    Filters
                </button>
            </div>
        </motion.div>
    );
};

export default JobSearch;