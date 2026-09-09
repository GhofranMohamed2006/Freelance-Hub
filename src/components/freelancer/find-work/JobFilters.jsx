import { motion } from "framer-motion";
import CustomDropdown from "./CustomDropdown";

const JobFilters = ({
    open,
    budget,
    setBudget,
    experience,
    setExperience,
    duration,
    setDuration,
    onClear,
}) => {
    return (
        <aside className={`${open ? "block" : "hidden"} lg:block`}>
            <motion.div
                className="sticky top-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.5,
                    delay: 0.25,
                    ease: "easeOut",
                }}
            >
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-slate-900">
                            Filters
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            Refine your search
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClear}
                        className="
                            text-xs font-semibold
                            text-indigo-600
                            transition
                            hover:text-indigo-700
                        "
                    >
                        Clear
                    </button>
                </div>

                <div className="mb-6">
                    <label className="mb-3 block text-sm font-semibold text-slate-800">
                        Budget
                    </label>

                    <CustomDropdown
                        value={budget}
                        onChange={setBudget}
                        options={[
                            { value: "all", label: "Any Budget" },
                            { value: "under-500", label: "Under $500" },
                            { value: "500-1000", label: "$500 - $1,000" },
                            { value: "1000-plus", label: "$1,000+" },
                        ]}
                    />
                </div>

                <div className="mb-6">
                    <label className="mb-3 block text-sm font-semibold text-slate-800">
                        Experience Level
                    </label>

                    <CustomDropdown
                        value={experience}
                        onChange={setExperience}
                        options={[
                            { value: "all", label: "Any Level" },
                            { value: "entry", label: "Entry Level" },
                            { value: "intermediate", label: "Intermediate" },
                            { value: "expert", label: "Expert" },
                        ]}
                    />
                </div>

                <div>
                    <label className="mb-3 block text-sm font-semibold text-slate-800">
                        Project Duration
                    </label>

                    <CustomDropdown
                        value={duration}
                        onChange={setDuration}
                        options={[
                            { value: "all", label: "Any Duration" },
                            { value: "short", label: "Short Term" },
                            { value: "medium", label: "Medium Term" },
                            { value: "long", label: "Long Term" },
                        ]}
                    />
                </div>
            </motion.div>
        </aside>
    );
};

export default JobFilters;