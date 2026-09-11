import { motion } from "framer-motion";

const FindWorkHeader = ({ jobsCount }) => {
    return (
        <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Discover Your Next Project
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                        Explore projects that match your skills and start
                        working with great clients.
                    </p>
                </div>

                <motion.div
                    className="rounded-2xl bg-white px-5 py-3 shadow-sm ring-1 ring-slate-100"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.2,
                    }}
                >
                    <p className="text-xs text-slate-400">
                        Available projects
                    </p>

                    <p className="mt-1 text-2xl font-bold text-slate-900">
                        {jobsCount}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FindWorkHeader;