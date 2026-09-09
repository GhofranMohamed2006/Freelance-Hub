import { motion } from "framer-motion";

import JobCard from "./JobCards";
import EmptyJobs from "./EmptyJobs";

const JobList = ({
    jobs,
    savedJobs,
    onSave,
    onApply,
    onClear,
    getCategory,
    getClientName,
    getSkills,
    getJobIcon,
    formatDate,
    getBudgetText,
}) => {
    if (jobs.length === 0) {
        return <EmptyJobs onClear={onClear} />;
    }

    return (
        <main>
            <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.08,
                        },
                    },
                }}
            >
                {jobs.map((job) => {
                    const jobId = job?.id || job?._id;

                    return (
                        <motion.div
                            key={jobId}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    y: 25,
                                },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.4,
                                        ease: "easeOut",
                                    },
                                },
                            }}
                        >
                            <JobCard
                                job={job}
                                isSaved={savedJobs.includes(jobId)}
                                onSave={onSave}
                                onApply={onApply}
                                getCategory={getCategory}
                                getClientName={getClientName}
                                getSkills={getSkills}
                                getJobIcon={getJobIcon}
                                formatDate={formatDate}
                                getBudgetText={getBudgetText}
                            />
                        </motion.div>
                    );
                })}
            </motion.div>
        </main>
    );
};

export default JobList;