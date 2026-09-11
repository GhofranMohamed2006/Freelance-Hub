import { motion } from "framer-motion";
import {
    FiArrowLeft,
    FiCode,
    FiPenTool,
    FiSmartphone,
} from "react-icons/fi";

const WorkDetailsHeader = ({
    job,
    onBack,
}) => {
    const getCategory = () => {
        if (typeof job?.category === "string") {
            return job.category;
        }

        if (job?.category?.name) {
            return job.category.name;
        }

        if (job?.category?.title) {
            return job.category.title;
        }

        return "Development";
    };

    const getIcon = () => {
        const category = getCategory().toLowerCase();

        if (
            category.includes("design") ||
            category.includes("ui") ||
            category.includes("ux")
        ) {
            return FiPenTool;
        }

        if (
            category.includes("mobile") ||
            category.includes("app")
        ) {
            return FiSmartphone;
        }

        return FiCode;
    };

    const formatDate = (date) => {
        if (!date) {
            return "Recently posted";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "Recently posted";
        }

        const now = new Date();
        const diff = now - parsedDate;

        const minutes = Math.floor(
            diff / (1000 * 60)
        );

        const hours = Math.floor(
            diff / (1000 * 60 * 60)
        );

        const days = Math.floor(
            diff / (1000 * 60 * 60 * 24)
        );

        if (minutes < 60) {
            return `${Math.max(minutes, 1)} min ago`;
        }

        if (hours < 24) {
            return `${hours} hr${hours > 1 ? "s" : ""
                } ago`;
        }

        if (days < 30) {
            return `${days} day${days > 1 ? "s" : ""
                } ago`;
        }

        return parsedDate.toLocaleDateString();
    };

    const Icon = getIcon();

    const isOpen =
        String(job?.status || "").toLowerCase() ===
        "open";

    return (
        <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                ease: "easeOut",
            }}
        >
            <button
                type="button"
                onClick={onBack}
                className="
                    mb-5
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-slate-500
                    transition
                    hover:text-indigo-600
                "
            >
                <FiArrowLeft className="h-4 w-4" />
                Back to Find Work
            </button>

            <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                            <Icon className="h-7 w-7" />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                {job?.title ||
                                    "Untitled Project"}
                            </h1>

                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
                                <span className="font-medium text-slate-700">
                                    {getCategory()}
                                </span>

                                <span>•</span>

                                <span>
                                    Posted{" "}
                                    {formatDate(
                                        job?.createdAt
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <span
                        className={`
                            w-fit
                            rounded-full
                            px-3.5 py-1.5
                            text-xs
                            font-semibold
                            ${isOpen
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-slate-100 text-slate-500"
                            }
                        `}
                    >
                        {isOpen ? "Open" : job?.status || "Closed"}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default WorkDetailsHeader;