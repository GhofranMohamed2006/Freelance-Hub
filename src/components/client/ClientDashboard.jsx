import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FiBriefcase,
    FiFileText,
    FiClock,
    FiCheckCircle,
    FiPlus,
    FiArrowRight,
    FiAlertCircle,
    FiCheck,
    FiX,
} from "react-icons/fi";

import {
    getClientDashboard,
    updateMilestone,
} from "../../api/client.api";

import Loader from "../../components/common/Loader";
import { useAuth } from "../context/AuthContext";

const ClientDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================
    // Load Dashboard
    // =========================

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getClientDashboard();

                setDashboard(data);
            } catch (err) {
                setError(
                    err.message ||
                    "Failed to load dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDashboard();
    }, []);

    // =========================
    // Milestone Action
    // =========================

    const handleMilestoneAction = async (
        projectId,
        milestoneId,
        status
    ) => {
        try {
            setError("");

            await updateMilestone(
                projectId,
                milestoneId,
                status
            );

            setDashboard((prev) => ({
                ...prev,
                milestoneRequests:
                    prev.milestoneRequests.filter(
                        (milestone) =>
                            milestone.id !== milestoneId
                    ),
            }));
        } catch (err) {
            setError(
                err.message ||
                "Failed to update milestone."
            );
        }
    };

    // =========================
    // Loading State
    // =========================

    if (loading) {
        return (
            <Loader text="Loading dashboard..." />
        );
    }

    // =========================
    // Error State
    // =========================

    if (error && !dashboard) {
        return (
            <div className="min-h-[300px] bg-[#F8F9FC] p-6">
                <div className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-xl border border-red-100 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <FiAlertCircle size={24} />
                    </div>

                    <h2 className="text-lg font-bold text-[#0B1120]">
                        Something went wrong
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            window.location.reload()
                        }
                        className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // =========================
    // Stats
    // =========================

    const stats = [
        {
            title: "Active Jobs",
            value:
                dashboard?.stats?.activeJobs ?? 0,
            icon: FiBriefcase,
        },
        {
            title: "Proposals Received",
            value:
                dashboard?.stats?.proposalsReceived ?? 0,
            icon: FiFileText,
        },
        {
            title: "Ongoing Projects",
            value:
                dashboard?.stats?.ongoingProjects ?? 0,
            icon: FiClock,
        },
        {
            title: "Completed Projects",
            value:
                dashboard?.stats?.completedProjects ?? 0,
            icon: FiCheckCircle,
        },
    ];

    const jobs = dashboard?.activeJobs || [];

    const milestoneRequests =
        dashboard?.milestoneRequests || [];

    return (
        <div className="min-h-screen bg-[#F8F9FC]">

            {/* =========================
                Header
            ========================= */}

            <div className="mb-8 flex flex-col gap-4 p-2 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[#0B1120]">
                        Good morning,{" "}
                        {user?.name || "Client"} 👋
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Here's what's happening with
                        your projects today.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() =>
                        navigate("/post-job")
                    }
                    className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                    <FiPlus size={17} />
                    Post a New Job
                </button>
            </div>

            {/* =========================
                Error Message
            ========================= */}

            {error && dashboard && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    <FiAlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* =========================
                Stats
            ========================= */}

            <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="flex min-h-[150px] items-center justify-center rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                    <Icon size={21} />
                                </div>

                                <p className="text-sm text-gray-500">
                                    {stat.title}
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-[#0B1120]">
                                    {stat.value}
                                </h2>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* =========================
                Active Jobs
            ========================= */}

            <div className="mb-8 rounded-xl border border-gray-100 bg-white shadow-sm">

                {/* Section Header */}

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                        <h2 className="font-bold text-[#0B1120]">
                            My Active Jobs
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Jobs currently accepting
                            proposals
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/myjobs")
                        }
                        className="flex cursor-pointer items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                    >
                        View All
                        <FiArrowRight size={15} />
                    </button>
                </div>

                {/* Empty State */}

                {jobs.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                            <FiBriefcase size={22} />
                        </div>

                        <h3 className="font-semibold text-[#0B1120]">
                            No active jobs yet
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Post your first job and start
                            receiving proposals.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/post-job")
                            }
                            className="mt-5 cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            Post a Job
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="min-w-[850px]">

                            {/* Table Header */}

                            <div className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_auto] items-center gap-6 border-b border-gray-100 bg-gray-50/70 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                                <div>
                                    Job
                                </div>

                                <div>
                                    Budget
                                </div>

                                <div>
                                    Proposals
                                </div>

                                <div>
                                    Status
                                </div>

                                <div>
                                    Action
                                </div>
                            </div>

                            {/* Table Rows */}

                            <div className="divide-y divide-gray-100">
                                {jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="grid grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_auto] items-center gap-6 px-6 py-5"
                                    >

                                        {/* Job */}

                                        <div className="min-w-0">
                                            <h3 className="truncate font-semibold text-[#0B1120]">
                                                {job.title}
                                            </h3>

                                            <p className="mt-1 truncate text-sm text-gray-500">
                                                {job.category ||
                                                    "Uncategorized"}
                                            </p>
                                        </div>

                                        {/* Budget */}

                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {job.budget ||
                                                    "—"}
                                            </p>
                                        </div>

                                        {/* Proposals */}

                                        <div>
                                            <p className="font-medium text-gray-700">
                                                {job.proposals ??
                                                    0}
                                            </p>
                                        </div>

                                        {/* Status */}

                                        <div>
                                            <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-600">
                                                {job.status ||
                                                    "open"}
                                            </span>
                                        </div>

                                        {/* Action */}

                                        <div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    navigate(
                                                        `/jobs/${job.id}`
                                                    )
                                                }
                                                className="whitespace-nowrap rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                                            >
                                                View Details
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* =========================
                Milestone Approval Requests
            ========================= */}

            <div className="mb-8 rounded-xl border border-gray-100 bg-white shadow-sm">

                {/* Section Header */}

                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                    <div>
                        <h2 className="font-bold text-[#0B1120]">
                            Milestone Approval Requests
                        </h2>

                        <p className="mt-1 text-xs text-gray-500">
                            Review milestones submitted
                            by freelancers
                        </p>
                    </div>
                </div>

                {/* Empty State */}

                {milestoneRequests.length === 0 ? (
                    <div className="px-6 py-10 text-center">
                        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                            <FiCheckCircle size={21} />
                        </div>

                        <p className="text-sm font-medium text-gray-700">
                            No milestone requests
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            You don't have any pending
                            milestone approvals.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">

                        {milestoneRequests.map(
                            (milestone) => (
                                <div
                                    key={`${milestone.projectId}-${milestone.id}`}
                                    className="flex flex-col gap-5 px-6 py-5 lg:flex-row lg:items-center lg:justify-between"
                                >

                                    {/* Milestone Info */}

                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-[#0B1120]">
                                            {
                                                milestone.title
                                            }
                                        </h3>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {
                                                milestone.projectTitle
                                            }
                                        </p>

                                        {milestone.description && (
                                            <p className="mt-2 line-clamp-2 text-xs text-gray-400">
                                                {
                                                    milestone.description
                                                }
                                            </p>
                                        )}
                                    </div>

                                    {/* Actions */}

                                    <div className="flex flex-wrap items-center gap-3">

                                        <span className="text-sm font-semibold text-gray-700">
                                            $
                                            {
                                                milestone.amount ??
                                                0
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/projects/${milestone.projectId}`
                                                )
                                            }
                                            className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-300 hover:text-blue-600"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleMilestoneAction(
                                                    milestone.projectId,
                                                    milestone.id,
                                                    "approved"
                                                )
                                            }
                                            className="flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
                                        >
                                            <FiCheck size={14} />
                                            Accept
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleMilestoneAction(
                                                    milestone.projectId,
                                                    milestone.id,
                                                    "cancelled"
                                                )
                                            }
                                            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-4 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                                        >
                                            <FiX size={14} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;