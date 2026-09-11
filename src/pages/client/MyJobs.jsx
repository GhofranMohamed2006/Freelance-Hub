import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Edit3, Plus, Search, Trash2 } from "lucide-react";
import api from "../../api/axios.js";
import { getMe } from "../../api/auth.api.js";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError("");
      const me = await getMe();
      const user = me.user || me;
      const response = await api.get("/jobs", {
        params: { clientId: user.id, status: status || undefined, search: search || undefined },
      });
      const data = response.data;
      setJobs(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadJobs, 200);
    return () => clearTimeout(timer);
  }, [search, status]);

  const visibleJobs = useMemo(() => jobs, [jobs]);

  const removeJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs((items) => items.filter((item) => item.id !== id));
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to delete job");
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">My Jobs</h1>
          <p className="mt-1 text-sm text-slate-500">Manage the jobs you have posted.</p>
        </div>
        <Link to="/post-job" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
          <Plus className="h-4 w-4" /> Post a Job
        </Link>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-3 md:grid-cols-[1fr_180px]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search your jobs..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
            <option value="">All statuses</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      {loading ? (
        <div className="rounded-2xl bg-white p-12 text-center text-sm text-slate-500">Loading jobs...</div>
      ) : visibleJobs.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm">
          <Briefcase className="mx-auto h-10 w-10 text-slate-300" />
          <h2 className="mt-4 font-semibold text-slate-800">No jobs found</h2>
          <p className="mt-1 text-sm text-slate-500">Post your first job to start receiving proposals.</p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {visibleJobs.map((job) => (
            <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-slate-900">{job.title || "Untitled Job"}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">{job.description || "No description provided."}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">{job.status || "open"}</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-400">Budget</p><p className="mt-1 font-semibold text-slate-800">${job.budget ?? job.maxBudget ?? 0}</p></div>
                <div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-400">Views</p><p className="mt-1 font-semibold text-slate-800">{job.views || 0}</p></div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-2">
                {/* <Link to={`/jobs/${job.id}`} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">View</Link> */}
                <Link to={`/jobs/${job.id}/proposals`} className="rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-800">Proposals</Link>
                <Link to={`/post-job?edit=${job.id}`} className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50"><Edit3 className="h-4 w-4" /></Link>
                <button onClick={() => removeJob(job.id)} className="rounded-lg border border-red-100 p-2 text-red-500 hover:bg-red-50"><Trash2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;
