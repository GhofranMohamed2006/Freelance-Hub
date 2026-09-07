import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";
import { money, date, statusClass } from "./helpers";

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function ProjectCard({ project }) {
  const milestones = Array.isArray(project.milestones)
    ? project.milestones
    : [];
  const completedMilestones = milestones.filter(
    (m) => String(m.status || "").toLowerCase() === "completed",
  ).length;
  const progress = milestones.length
    ? Math.round((completedMilestones / milestones.length) * 100)
    : Math.min(Math.max(Number(project.progress || 0), 0), 100);

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -5 }}
      className="group rounded-[24px] border border-slate-100 p-5 transition hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-100/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <BriefcaseBusiness className="h-5 w-5" />
        </div>
        <span
          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(project.status)}`}
        >
          {project.status || "Active"}
        </span>
      </div>

      <h3 className="mt-5 line-clamp-2 font-serif text-2xl font-bold">
        {project.title || project.name || "Untitled Project"}
      </h3>
      <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
        {project.description || "No project description."}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span className="text-slate-400">Progress</span>
        <span className="font-semibold text-indigo-600">{progress}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8 }}
          className="h-full rounded-full bg-indigo-600"
        />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-400">Value</p>
          <p className="mt-1 font-semibold">{money(project.amount)}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-xs text-slate-400">Due date</p>
          <p className="mt-1 truncate font-semibold">{date(project.dueDate)}</p>
        </div>
      </div>

      <Link
        to={`/freelancer/projects/${project.id}`}
        className="mt-5 flex items-center justify-between rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
      >
        Open Workspace
        <ArrowUpRight className="h-4 w-4" />
      </Link>
    </motion.article>
  );
}
