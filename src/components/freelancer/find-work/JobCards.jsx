import {
    FiBookmark,
    FiCheckCircle,
    FiClock,
    FiDollarSign,
    FiMapPin,
    FiArrowRight,
} from "react-icons/fi";

import { motion } from "framer-motion";

const JobCard = ({
    job,
    isSaved,
    onSave,
    onApply,
    getCategory,
    getClientName,
    getSkills,
    getJobIcon,
    formatDate,
    getBudgetText,
}) => {
    const jobId = job?.id || job?._id;

    const Icon = getJobIcon(job);
    const skills = getSkills(job);
    const category = getCategory(job);
    const clientName = getClientName(job);

    return (
        <motion.article
            className="
                group
                rounded-2xl
                bg-white
                p-5
                shadow-sm
                ring-1 ring-slate-100
                transition-shadow duration-300
                hover:shadow-md
                sm:p-6
            "
            whileHover={{
                y: -4,
            }}
            transition={{
                duration: 0.2,
                ease: "easeOut",
            }}
        >
            {/* Top */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                    {/* Category Icon */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <Icon className="h-6 w-6" />
                    </div>

                    {/* Job Info */}
                    <div className="min-w-0">
                        <h2 className="line-clamp-2 text-lg font-bold text-slate-900 transition group-hover:text-indigo-600">
                            {job?.title || "Untitled Project"}
                        </h2>

                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span className="font-medium text-slate-600">
                                {clientName}
                            </span>

                            <span>•</span>

                            <span>
                                {formatDate(job?.createdAt)}
                            </span>

                            <span>•</span>

                            <span>{category}</span>
                        </div>
                    </div>
                </div>

                {/* Save */}
                <button
                    type="button"
                    onClick={() => onSave(jobId)}
                    className={`
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl
                        border
                        transition
                        ${isSaved
                            ? "border-indigo-200 bg-indigo-50 text-indigo-600"
                            : "border-slate-200 text-slate-400 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        }
                    `}
                    aria-label={
                        isSaved
                            ? "Remove from saved jobs"
                            : "Save job"
                    }
                >
                    <FiBookmark
                        className="h-5 w-5"
                        fill={isSaved ? "currentColor" : "none"}
                    />
                </button>
            </div>

            {/* Description */}
            <p className="mt-5 line-clamp-3 text-sm leading-6 text-slate-600">
                {job?.description ||
                    "No description provided for this project."}
            </p>

            {/* Skills */}
            {skills.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span
                            key={`${skill}-${index}`}
                            className="
                                rounded-lg
                                bg-slate-100
                                px-3 py-1.5
                                text-xs font-medium
                                text-slate-600
                            "
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Meta */}
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-3">
                {/* Budget */}
                <div className="flex items-center gap-2">
                    <FiDollarSign className="h-4 w-4 text-indigo-500" />

                    <div>
                        <p className="text-[11px] text-slate-400">
                            Budget
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                            {getBudgetText(job)}
                        </p>
                    </div>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-indigo-500" />

                    <div>
                        <p className="text-[11px] text-slate-400">
                            Duration
                        </p>

                        <p className="text-sm font-semibold text-slate-800">
                            {job?.projectDuration || "Not specified"}
                        </p>
                    </div>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2">
                    <FiMapPin className="h-4 w-4 text-indigo-500" />

                    <div>
                        <p className="text-[11px] text-slate-400">
                            Experience
                        </p>

                        <p className="text-sm font-semibold capitalize text-slate-800">
                            {job?.experienceLevel || "Any level"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    {job?.paymentVerified && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                            <FiCheckCircle className="h-4 w-4" />
                            Payment verified
                        </span>
                    )}

                    {job?.views !== undefined && (
                        <span className="text-xs text-slate-400">
                            {job.views} views
                        </span>
                    )}
                </div>

                {/* Apply */}
                <button
                    type="button"
                    onClick={() => onApply(job)}
                    className="
                        flex items-center justify-center gap-2
                        rounded-xl
                        bg-indigo-600
                        px-5 py-3
                        text-sm font-semibold text-white
                        transition
                        hover:bg-indigo-700
                    "
                >
                    Apply Now

                    <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>
        </motion.article>
    );
};

export default JobCard;