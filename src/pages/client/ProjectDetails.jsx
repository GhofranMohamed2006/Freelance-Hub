import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axios.js";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get(`/projects/${id}`).then((r) => setProject(r.data)).catch((e) => setError(e?.response?.data?.message || e?.message || "Failed to load project")); }, [id]);
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">{error}</div>;
  if (!project) return <div className="p-10 text-center text-sm text-slate-500">Loading project...</div>;
  return <div className="mx-auto max-w-5xl space-y-6"><Link to="/ongoingProjects" className="text-sm font-medium text-blue-700">← Back to projects</Link><div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"><div className="flex items-start justify-between"><div><h1 className="font-serif text-3xl font-bold text-slate-900">{project.title}</h1><p className="mt-3 text-sm leading-7 text-slate-500">{project.description}</p></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">{project.status}</span></div><div className="mt-8"><h2 className="font-semibold text-slate-800">Milestones</h2><div className="mt-4 space-y-3">{(project.milestones || []).map((m) => <div key={m.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="font-medium text-slate-800">{m.title}</p><p className="text-xs text-slate-500">{m.description}</p></div><span className="text-xs font-semibold capitalize text-slate-600">{m.status}</span></div>)}</div></div></div></div>;
};
export default ProjectDetails;
