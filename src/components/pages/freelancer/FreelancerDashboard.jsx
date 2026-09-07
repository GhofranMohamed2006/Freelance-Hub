import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  DollarSign,
  FileText,
  Bell,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import { getFreelancerDashboard } from "../../../api/freelancer.api.js";
import StatCard from "./StatCard.jsx";
import OverviewRow from "./OverviewRow.jsx";
import EmptyState from "./EmptyState.jsx";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const formatMoney = (value) =>
  `$${Number(value || 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getStatusClass = (status) => {
  const normalized = String(status || "").toLowerCase();

  if (
    normalized.includes("complete") ||
    normalized.includes("accept") ||
    normalized.includes("approved")
  ) {
    return "bg-emerald-50 text-emerald-700";
  }

  if (normalized.includes("progress") || normalized.includes("active")) {
    return "bg-indigo-50 text-indigo-700";
  }

  if (normalized.includes("reject") || normalized.includes("cancel")) {
    return "bg-red-50 text-red-600";
  }

  return "bg-slate-100 text-slate-600";
};

export default function FreelancerDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getFreelancerDashboard();

        setDashboard(data);
      } catch (error) {
        console.error(error);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="rounded-2xl bg-white px-8 py-10 text-center shadow-sm">
          <p className="font-semibold text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  const user = dashboard?.user || {};
  const stats = dashboard?.stats || {};

  const projects = Array.isArray(dashboard?.projects) ? dashboard.projects : [];

  const proposals = Array.isArray(dashboard?.proposals)
    ? dashboard.proposals
    : [];

  const activities = Array.isArray(dashboard?.recentActivity)
    ? dashboard.recentActivity
    : [];

  const notifications = Array.isArray(dashboard?.notifications)
    ? dashboard.notifications
    : [];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#f8f9ff] text-slate-900"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          variants={cardVariants}
          className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-white via-white to-[#eeebff] px-6 py-8 shadow-sm md:px-10 md:py-10"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-100/50 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                  <Sparkles className="h-3.5 w-3.5" />
                  Freelancer Dashboard
                </span>
              </div>

              <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Welcome back,{" "}
                <span className="text-indigo-600">
                  {user.name || "Freelancer"}
                </span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Track your projects, earnings, proposals, and activity all from
                one place.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -4 }}
              className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-3xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                user.name?.charAt(0)?.toUpperCase() || "F"
              )}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          <StatCard
            variants={cardVariants}
            icon={DollarSign}
            title="Total Earned"
            value={formatMoney(stats.totalEarned)}
            description="Lifetime earnings"
          />

          <StatCard
            variants={cardVariants}
            icon={BriefcaseBusiness}
            title="Active Projects"
            value={stats.activeProjects || 0}
            description="Projects in progress"
          />

          <StatCard
            variants={cardVariants}
            icon={CheckCircle2}
            title="Completed"
            value={stats.completedProjects || 0}
            description="Projects completed"
          />

          <StatCard
            variants={cardVariants}
            icon={FileText}
            title="Active Proposals"
            value={stats.activeProposals || 0}
            description="Waiting for response"
          />
        </motion.section>

        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <motion.section
            variants={cardVariants}
            className="rounded-[28px] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Active Projects
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your current work
                </p>
              </div>

              <Link
                to="/freelancer/projects"
                className="flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {projects.length > 0 ? (
              <div className="space-y-4">
                {projects.slice(0, 5).map((project) => {
                  const progress = project.progress ?? project.completion ?? 0;

                  return (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -2 }}
                      className="rounded-2xl border border-slate-100 p-5 transition hover:border-indigo-100 hover:bg-indigo-50/20"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                          <BriefcaseBusiness className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <h3 className="truncate font-semibold text-slate-800">
                                {project.title ||
                                  project.name ||
                                  "Untitled Project"}
                              </h3>

                              <p className="mt-1 text-xs text-slate-400">
                                {project.dueDate
                                  ? `Due ${formatDate(project.dueDate)}`
                                  : "No deadline"}
                              </p>
                            </div>

                            <span
                              className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                                project.status,
                              )}`}
                            >
                              {project.status || "Active"}
                            </span>
                          </div>

                          <div className="mt-4 flex items-center gap-4">
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${Math.min(
                                    Math.max(Number(progress) || 0, 0),
                                    100,
                                  )}%`,
                                }}
                                transition={{
                                  duration: 0.9,
                                  ease: "easeOut",
                                }}
                                className="h-full rounded-full bg-indigo-600"
                              />
                            </div>

                            <span className="text-xs font-semibold text-indigo-600">
                              {Number(progress) || 0}%
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="font-semibold text-slate-800">
                            {formatMoney(project.amount)}
                          </p>

                          <Link
                            to={`/freelancer/projects/${project.id}`}
                            className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-indigo-600"
                          >
                            Open
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={BriefcaseBusiness}
                title="No active projects"
                description="Your active projects will appear here when you start working with a client."
              />
            )}
          </motion.section>

          <motion.section
            variants={cardVariants}
            className="rounded-[28px] bg-indigo-700 p-7 text-white shadow-lg shadow-indigo-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-indigo-200">Freelancer Overview</p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Your Progress
                </h2>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-8 space-y-6">
              <OverviewRow
                label="Active Projects"
                value={stats.activeProjects || 0}
              />

              <OverviewRow
                label="Completed Projects"
                value={stats.completedProjects || 0}
              />

              <OverviewRow
                label="Active Proposals"
                value={stats.activeProposals || 0}
              />

              <div className="border-t border-indigo-500/50 pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-indigo-200">Total Earned</span>

                  <span className="text-xl font-bold">
                    {formatMoney(stats.totalEarned)}
                  </span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.section
            variants={cardVariants}
            className="rounded-[28px] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Recent Proposals
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track your latest applications
                </p>
              </div>

              <FileText className="h-5 w-5 text-indigo-600" />
            </div>

            {proposals.length > 0 ? (
              <div className="space-y-3">
                {proposals.slice(0, 5).map((proposal) => (
                  <motion.div
                    key={proposal.id}
                    whileHover={{ x: 3 }}
                    className="flex items-center gap-4 rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <FileText className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {proposal.jobTitle || proposal.title || "Job Proposal"}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {proposal.amount
                          ? formatMoney(proposal.amount)
                          : "Proposal submitted"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        proposal.status,
                      )}`}
                    >
                      {proposal.status || "Pending"}
                    </span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={FileText}
                title="No proposals yet"
                description="Your submitted proposals will appear here."
              />
            )}
          </motion.section>

          <motion.section
            variants={cardVariants}
            className="rounded-[28px] bg-white p-6 shadow-sm md:p-8"
          >
            <div className="mb-7 flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-bold">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  What's happening with your work
                </p>
              </div>

              <Clock3 className="h-5 w-5 text-indigo-600" />
            </div>

            {activities.length > 0 ? (
              <div className="space-y-5">
                {activities.slice(0, 5).map((activity, index) => (
                  <div key={activity.id || index} className="flex gap-4">
                    <div className="relative">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        <CheckCircle2 className="h-4 w-4" />
                      </div>

                      {index !== activities.length - 1 && (
                        <div className="absolute left-1/2 top-10 h-8 w-px -translate-x-1/2 bg-slate-200" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800">
                        {activity.title ||
                          activity.message ||
                          activity.description ||
                          "New activity"}
                      </p>

                      {activity.createdAt && (
                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(activity.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Clock3}
                title="No recent activity"
                description="Your latest project and account activity will appear here."
              />
            )}
          </motion.section>
        </div>

        <motion.section
          variants={cardVariants}
          className="rounded-[28px] bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold">Notifications</h2>

              <p className="mt-1 text-sm text-slate-500">
                Stay updated with your account
              </p>
            </div>

            <Bell className="h-5 w-5 text-indigo-600" />
          </div>

          {notifications.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {notifications.slice(0, 6).map((notification, index) => (
                <motion.div
                  key={notification.id || index}
                  whileHover={{ y: -2 }}
                  className={`rounded-2xl border p-4 ${
                    notification.read
                      ? "border-slate-100 bg-white"
                      : "border-indigo-100 bg-indigo-50/40"
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                      <Bell className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {notification.title ||
                          notification.message ||
                          "New notification"}
                      </p>

                      {notification.createdAt && (
                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(notification.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-10 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <Bell className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-semibold text-slate-800">
                You're all caught up
              </h3>

              <p className="mt-1 max-w-md text-sm text-slate-400">
                New messages, project updates, and account notifications will
                appear here.
              </p>
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}



