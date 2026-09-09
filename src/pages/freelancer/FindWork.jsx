import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiX, FiCode, FiPenTool, FiSmartphone } from "react-icons/fi";

import api from "../../api/axios";

import FindWorkHeader from "../../components/freelancer/find-work/FindWorkHeader";
import JobSearch from "../../components/freelancer/find-work/JobSearch";
import JobFilters from "../../components/freelancer/find-work/JobFilters";
import JobList from "../../components/freelancer/find-work/JobList";

const FindWork = () => {
    const navigate = useNavigate();

    // ==========================================
    // STATES
    // ==========================================

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [projectType, setProjectType] = useState("all");

    const [filtersOpen, setFiltersOpen] = useState(false);

    const [budget, setBudget] = useState("all");
    const [experience, setExperience] = useState("all");
    const [duration, setDuration] = useState("all");

    const [savedJobs, setSavedJobs] = useState(() => {
        try {
            return JSON.parse(
                localStorage.getItem("lynk_saved_jobs")
            ) || [];
        } catch {
            return [];
        }
    });

    // ==========================================
    // GET JOBS FROM BACKEND
    // ==========================================

    useEffect(() => {
        const loadJobs = async () => {
            try {
                setError("");

                const params = {
                    status: "open",
                };

                // Search
                if (search.trim()) {
                    params.search = search.trim();
                }

                // Experience
                if (experience !== "all") {
                    params.experienceLevel = experience;
                }

                const response = await api.get("/jobs", {
                    params,
                });

                const result = response.data;

                const jobsData = Array.isArray(result)
                    ? result
                    : Array.isArray(result?.data)
                        ? result.data
                        : Array.isArray(result?.jobs)
                            ? result.jobs
                            : [];

                setJobs(jobsData);
            } catch (err) {
                console.error("Failed to load jobs:", err);

                setError(
                    err?.response?.data?.message ||
                    err?.response?.data?.error ||
                    err?.message ||
                    "Failed to load jobs."
                );
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            loadJobs();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, experience]);

    // ==========================================
    // SAVE / UNSAVE JOB
    // ==========================================

    const toggleSaveJob = (jobId) => {
        setSavedJobs((prev) => {
            const exists = prev.includes(jobId);

            const updated = exists
                ? prev.filter((id) => id !== jobId)
                : [...prev, jobId];

            localStorage.setItem(
                "lynk_saved_jobs",
                JSON.stringify(updated)
            );

            return updated;
        });
    };

    // ==========================================
    // HELPERS
    // ==========================================

    const getJobId = (job) => {
        return job?.id || job?._id;
    };

    const getCategory = (job) => {
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

    const getClientName = (job) => {
        if (typeof job?.client === "string") {
            return job.client;
        }

        if (job?.client?.name) {
            return job.client.name;
        }

        if (
            job?.client?.firstName ||
            job?.client?.lastName
        ) {
            return `${job.client.firstName || ""} ${job.client.lastName || ""
                }`.trim();
        }

        if (job?.clientName) {
            return job.clientName;
        }

        if (job?.company) {
            return job.company;
        }

        return "Client";
    };

    const getSkills = (job) => {
        if (!Array.isArray(job?.skills)) {
            return [];
        }

        return job.skills
            .map((skill) => {
                if (typeof skill === "string") {
                    return skill;
                }

                return skill?.name || skill?.title || "";
            })
            .filter(Boolean);
    };

    const getJobIcon = (job) => {
        const category = getCategory(job).toLowerCase();

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

    const getBudgetText = (job) => {
        const budgetType = String(
            job?.budgetType || ""
        ).toLowerCase();

        // Hourly
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

        // Fixed
        if (
            job?.budget !== undefined &&
            job?.budget !== null
        ) {
            return `$${job.budget}`;
        }

        return "Budget not specified";
    };

    const getProjectType = (job) => {
        const type = String(
            job?.budgetType || ""
        ).toLowerCase();

        if (type === "hourly") {
            return "hourly";
        }

        if (type === "fixed") {
            return "fixed";
        }

        return "all";
    };

    // ==========================================
    // FRONTEND FILTERS
    // ==========================================

    const filteredJobs = useMemo(() => {
        return jobs.filter((job) => {
            // -----------------------------
            // Project Type
            // -----------------------------

            if (projectType !== "all") {
                const jobType = getProjectType(job);

                if (jobType !== projectType) {
                    return false;
                }
            }

            // -----------------------------
            // Budget
            // -----------------------------

            if (budget !== "all") {
                const numericBudget =
                    Number(job?.budget) ||
                    Number(job?.hourlyRateMax) ||
                    Number(job?.hourlyRateMin) ||
                    0;

                if (
                    budget === "under-500" &&
                    numericBudget >= 500
                ) {
                    return false;
                }

                if (
                    budget === "500-1000" &&
                    (
                        numericBudget < 500 ||
                        numericBudget > 1000
                    )
                ) {
                    return false;
                }

                if (
                    budget === "1000-plus" &&
                    numericBudget < 1000
                ) {
                    return false;
                }
            }

            // -----------------------------
            // Duration
            // -----------------------------

            if (duration !== "all") {
                const jobDuration = String(
                    job?.projectDuration || ""
                ).toLowerCase();

                if (
                    duration === "short" &&
                    !(
                        jobDuration.includes("day") ||
                        jobDuration.includes("week")
                    )
                ) {
                    return false;
                }

                if (
                    duration === "medium" &&
                    !(
                        jobDuration.includes("week") ||
                        jobDuration.includes("month")
                    )
                ) {
                    return false;
                }

                if (
                    duration === "long" &&
                    !(
                        jobDuration.includes("month") ||
                        jobDuration.includes("long")
                    )
                ) {
                    return false;
                }
            }

            return true;
        });
    }, [
        jobs,
        projectType,
        budget,
        duration,
    ]);

    // ==========================================
    // CLEAR FILTERS
    // ==========================================

    const clearFilters = () => {
        setSearch("");
        setProjectType("all");
        setBudget("all");
        setExperience("all");
        setDuration("all");
    };

    // ==========================================
    // APPLY
    // ==========================================

    const handleApply = (job) => {
        const jobId = getJobId(job);

        if (!jobId) {
            return;
        }

        navigate(`/jobs/${jobId}/apply`);
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600" />

                    <p className="mt-4 text-sm text-slate-500">
                        Finding the best projects for you...
                    </p>
                </div>
            </div>
        );
    }

    // ==========================================
    // PAGE
    // ==========================================

    return (
        <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <FindWorkHeader
                    jobsCount={filteredJobs.length}
                />

                {/* Search */}
                <JobSearch
                    search={search}
                    setSearch={setSearch}
                    projectType={projectType}
                    setProjectType={setProjectType}
                    onFiltersClick={() =>
                        setFiltersOpen(
                            (prev) => !prev
                        )
                    }
                />

                {/* Error */}
                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                        <FiX className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                        <div>
                            <p className="font-semibold text-red-700">
                                Couldn&apos;t load projects
                            </p>

                            <p className="mt-1 text-sm text-red-600">
                                {error}
                            </p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">

                    {/* Jobs */}
                    <JobList
                        jobs={filteredJobs}
                        savedJobs={savedJobs}
                        onSave={toggleSaveJob}
                        onApply={handleApply}
                        onClear={clearFilters}
                        getCategory={getCategory}
                        getClientName={getClientName}
                        getSkills={getSkills}
                        getJobIcon={getJobIcon}
                        formatDate={formatDate}
                        getBudgetText={getBudgetText}
                    />

                    {/* Filters - Right */}
                    <JobFilters
                        open={filtersOpen}
                        budget={budget}
                        setBudget={setBudget}
                        experience={experience}
                        setExperience={setExperience}
                        duration={duration}
                        setDuration={setDuration}
                        onClear={clearFilters}
                    />

                </div>
            </div>
        </div>
    );
};

export default FindWork;