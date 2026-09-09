import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  DollarSign,
  FolderOpen,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getFreelancerProjects } from "../../api/freelancer.api.js";
import SummaryCard from "./SummaryCard";
import ProjectCard from "./ProjectCard";
import { money } from "./helpers";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function FreelancerProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getFreelancerProjects();
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const active = projects.filter((p) => {
    const s = String(p.status || "").toLowerCase();
    return s.includes("active") || s.includes("progress");
  });

  const completed = projects.filter((p) =>
    String(p.status || "")
      .toLowerCase()
      .includes("complete"),
  );
  const totalValue = projects.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0,
  );

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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

  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#f8f9ff] text-slate-900"
    >
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          variants={item}
          className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-white via-white to-[#eeebff] p-7 shadow-sm md:p-10"
        >
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1.5 text-xs font-semibold text-indigo-700">
                <FolderOpen className="h-3.5 w-3.5" />
                Freelancer Projects
              </div>
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                My Projects
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
                Manage your projects, track progress, and open a workspace when
                you need to work.
              </p>
            </div>
            <Link
              to="/freelancer/find-work"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Find More Work
            </Link>
          </div>
        </motion.section>

        <motion.section
          variants={container}
          className="grid gap-4 sm:grid-cols-3"
        >
          <SummaryCard
            icon={BriefcaseBusiness}
            title="Total Projects"
            value={projects.length}
            description="All your projects"
          />
          <SummaryCard
            icon={CalendarDays}
            title="Active Projects"
            value={active.length}
            description="Currently in progress"
          />
          <SummaryCard
            icon={DollarSign}
            title="Project Value"
            value={money(totalValue)}
            description={`${completed.length} completed`}
          />
        </motion.section>

        <motion.section
          variants={item}
          className="rounded-[28px] bg-white p-6 shadow-sm md:p-8"
        >
          <div className="mb-7 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold">All Projects</h2>
              <p className="mt-1 text-sm text-slate-500">
                Your projects from the Lynk marketplace
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
              {projects.length} projects
            </span>
          </div>

          {projects.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-50 px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                <FolderOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold">
                No projects yet
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                Your projects will appear here after a client hires you.
              </p>
              <Link
                to="/freelancer/find-work"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
              >
                Find Work
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </motion.section>
      </div>
    </motion.main>
  );
}
