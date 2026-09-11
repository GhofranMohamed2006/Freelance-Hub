import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";
import api from "../../api/axios.js";

const OngoingProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const response = await api.get("/projects", { params: { status: "active" } });
        const data = response.data;
        setProjects(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err?.response?.data?.message || err?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div><h1 className="font-serif text-3xl font-bold text-slate-900">Ongoing Projects</h1><p className="mt-1 text-sm text-slate-500">Track the projects currently in progress.</p></div>
      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}
      {loading ? <div className="rounded-2xl bg-white p-12 text-center text-sm text-slate-500">Loading projects...</div> : projects.length === 0 ? <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm"><BriefcaseBusiness className="mx-auto h-10 w-10 text-slate-300" /><h2 className="mt-4 font-semibold text-slate-800">No ongoing projects</h2><p className="mt-1 text-sm text-slate-500">Active projects will appear here.</p></div> : <div className="grid gap-5 lg:grid-cols-2">{projects.map((project) => <article key={project.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h2 className="font-serif text-xl font-semibold text-slate-900">{project.title || "Project"}</h2><p className="mt-2 text-sm text-slate-500">{project.description || "No description provided."}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Active</span></div><div className="mt-5 flex items-center justify-between"><span className="text-sm font-semibold text-slate-800">${project.budget || 0}</span><Link to={`/projects/${project.id}`} className="rounded-xl bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800">Open Project</Link></div></article>)}</div>}
    </div>
  );
};
export default OngoingProjects;
