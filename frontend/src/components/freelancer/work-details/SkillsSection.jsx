import { motion } from "framer-motion";
import { FiCode } from "react-icons/fi";

const SkillsSection = ({ skills }) => {
    const normalizedSkills = Array.isArray(skills)
        ? skills
            .map((skill) => {
                if (typeof skill === "string") {
                    return skill;
                }

                return (
                    skill?.name ||
                    skill?.title ||
                    ""
                );
            })
            .filter(Boolean)
        : [];

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
                    <FiCode className="h-5 w-5" />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-slate-900">
                        Required Skills
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                        Skills needed for this project
                    </p>
                </div>
            </div>

            {normalizedSkills.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-2.5">
                    {normalizedSkills.map(
                        (skill, index) => (
                            <motion.span
                                key={`${skill}-${index}`}
                                className="
                                    rounded-xl
                                    bg-slate-100
                                    px-4 py-2
                                    text-sm
                                    font-medium
                                    text-slate-600
                                "
                                initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.25,
                                    delay: index * 0.05,
                                }}
                            >
                                {skill}
                            </motion.span>
                        )
                    )}
                </div>
            ) : (
                <p className="mt-6 text-sm text-slate-400">
                    No specific skills were listed.
                </p>
            )}
        </motion.section>
    );
};

export default SkillsSection;