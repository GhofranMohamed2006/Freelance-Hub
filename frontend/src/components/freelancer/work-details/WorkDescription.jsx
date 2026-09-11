import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";

const WorkDescription = ({ description }) => {
    return (
        <motion.section
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7"
            variants={{
                hidden: {
                    opacity: 0,
                    y: 25,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.45,
                        ease: "easeOut",
                    },
                },
            }}
        >
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FiFileText className="h-5 w-5" />
                </div>

                <h2 className="text-lg font-bold text-slate-900">
                    About the Project
                </h2>
            </div>

            <div className="mt-6">
                <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                    {description ||
                        "No description provided for this project."}
                </p>
            </div>
        </motion.section>
    );
};

export default WorkDescription;