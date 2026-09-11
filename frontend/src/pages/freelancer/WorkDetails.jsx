import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiAlertCircle, FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

import api from "../../api/axios";

import WorkDetailsHeader from "../../components/freelancer/work-details/workDetailsHeader";
import WorkDescription from "../../components/freelancer/work-details/workDescription";
import SkillsSection from "../../components/freelancer/work-details/skillsSection";
import ProjectInfo from "../../components/freelancer/work-details/projectInfo";
import ClientCard from "../../components/freelancer/work-details/clientCard";
import WorkDetailsSkeleton from "../../components/freelancer/work-details/workDetailsSkeleton";

const WorkDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadWorkDetails = async () => {
            if (!jobId) return;

            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/jobs/${jobId}`);

                const jobData = response.data;

                setJob(jobData);

                if (jobData.clientId) {
                    try {
                        const clientResponse = await api.get(
                            `/users/${jobData.clientId}/public-profile`
                        );

                        setClient(clientResponse.data);
                    } catch {
                        setClient(null);
                    }
                }
            } catch (err) {
                console.error("Failed to load work details:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Failed to load work details."
                );
            } finally {
                setLoading(false);
            }
        };

        loadWorkDetails();
    }, [jobId]);

    const handleBack = () => {
        navigate("/freelancer/find-work");
    };

    const handleApply = () => {
        navigate(`/jobs/${jobId}/apply`);
    };

    if (loading) {
        return <WorkDetailsSkeleton />;
    }

    if (error || !job) {
        return (
            <div className="min-h-[70vh] bg-slate-50 px-4 py-8 sm:px-6">
                <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
                    <div className="w-full rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50">
                            <FiAlertCircle className="h-7 w-7 text-red-500" />
                        </div>

                        <h1 className="mt-5 text-xl font-bold text-slate-900">
                            Couldn&apos;t load this project
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            {error || "This project could not be found."}
                        </p>

                        <button
                            type="button"
                            onClick={handleBack}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                            <FiArrowLeft className="h-4 w-4" />
                            Back to Find Work
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto max-w-7xl">
                <WorkDetailsHeader
                    job={job}
                    onBack={handleBack}
                />

                <motion.div
                    className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                >
                    <main className="space-y-6">
                        <WorkDescription
                            description={job.description}
                        />

                        <SkillsSection
                            skills={job.skills}
                        />

                        <ClientCard client={client} />
                    </main>

                    <ProjectInfo
                        job={job}
                        proposalsCount={job.proposalsCount || 0}
                        onApply={handleApply}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default WorkDetails;