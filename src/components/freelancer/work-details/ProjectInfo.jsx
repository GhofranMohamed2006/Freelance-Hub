import { motion } from "framer-motion";
import {
    FiClock,
    FiDollarSign,
    FiBriefcase,
    FiUsers,
    FiEye,
    FiArrowRight,
} from "react-icons/fi";

const ProjectInfo = ({
    job,
    proposalsCount,
    onApply,
}) => {
    const getBudget = () => {
        const budgetType = String(
            job?.budgetType || ""
        ).toLowerCase();

        if (
            budgetType === "hourly" ||
            job?.hourlyRateMin !== undefined ||
            job?.hourlyRateMax !== undefined
        ) {
            const min = job?.hourlyRateMin;
            const max = job?.hourlyRateMax;

            if (
                min !== undefined &&
                max !== undefined
            ) {
                return `$${min} - $${max}/hr`;
            }

            if (min !== undefined) {
                return `$${min}/hr`;
            }

            if (max !== undefined) {
                return `$${max}/hr`;
            }
        }

        if (
            job?.minBudget !== undefined &&
            job?.maxBudget !== undefined
        ) {
            return `$${job.minBudget} - $${job.maxBudget}`;
        }

        if (
            job?.budget !== undefined &&
            job?.budget !== null
        ) {
            return `$${job.budget}`;
        }

        return "Not specified";
    };

    const getBudgetLabel = () => {
        return String(
            job?.budgetType || ""
        ).toLowerCase() === "hourly"
            ? "Hourly Rate"
            : "Budget";
    };

    const isOpen =
        String(job?.status || "").toLowerCase() ===
        "open";

    return (
        <motion.aside
            className="lg:sticky lg:top-6 lg:self-start"
            variants={{
                hidden: {
                    opacity: 0,
                    x: 30,
                },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut",
                    },
                },
            }}
        >
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
                <div className="p-6">
                    <h2 className="text-lg font-bold text-slate-900">
                        Project Info
                    </h2>

                    <div className="mt-6 space-y-5">

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiDollarSign className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    {getBudgetLabel()}
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {getBudget()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiClock className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Duration
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {job?.projectDuration ||
                                        job?.duration ||
                                        "Not specified"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiBriefcase className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Experience
                                </p>

                                <p className="mt-1 text-sm font-semibold capitalize text-slate-800">
                                    {job?.experienceLevel ||
                                        "Any level"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiUsers className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Proposals
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {proposalsCount}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiEye className="h-4 w-4" />
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Views
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {job?.views || 0}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50 p-6">
                    <button
                        type="button"
                        onClick={onApply}
                        disabled={!isOpen}
                        className="
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-xl
                            bg-indigo-600
                            px-5 py-3.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-700
                            disabled:cursor-not-allowed
                            disabled:bg-slate-300
                        "
                    >
                        {isOpen
                            ? "Apply Now"
                            : "Project Closed"}

                        {isOpen && (
                            <FiArrowRight className="h-4 w-4" />
                        )}
                    </button>

                    {isOpen && (
                        <p className="mt-3 text-center text-xs text-slate-400">
                            Submit your proposal for this project
                        </p>
                    )}
                </div>
            </div>
        </motion.aside>
    );
};

export default ProjectInfo;