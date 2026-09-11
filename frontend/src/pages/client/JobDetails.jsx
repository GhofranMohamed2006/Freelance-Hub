import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Briefcase, Eye, DollarSign } from "lucide-react";
import api from "../../api/axios.js";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (!jobId) return;

  const loadJob = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/jobs/${jobId}`);
      setJob(response.data);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load job"
      );
    } finally {
      setLoading(false);
    }
  };

  loadJob();
}, [jobId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-slate-500">
        Loading job...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (!job) {
    return (
      <div className="p-10 text-center text-sm text-slate-500">
        Job not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-700">
              {job.status || "open"}
            </span>

            <h1 className="mt-4 font-serif text-3xl font-bold text-slate-900">
              {job.title}
            </h1>

            <p className="mt-3 text-sm leading-7 text-slate-500">
              {job.description}
            </p>
          </div>

          <Link
            to={`/jobs/${job.id}/proposals`}
            className="rounded-xl bg-blue-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
          >
            View Proposals
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-slate-50 p-4">
            <DollarSign className="h-5 w-5 text-blue-700" />

            <p className="mt-2 text-xs text-slate-400">
              Budget
            </p>

            <p className="font-semibold text-slate-800">
              ${job.budget || job.maxBudget || 0}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <Eye className="h-5 w-5 text-blue-700" />

            <p className="mt-2 text-xs text-slate-400">
              Views
            </p>

            <p className="font-semibold text-slate-800">
              {job.views || 0}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <Briefcase className="h-5 w-5 text-blue-700" />

            <p className="mt-2 text-xs text-slate-400">
              Category
            </p>

            <p className="font-semibold text-slate-800">
              {job.category || "General"}
            </p>
          </div>
        </div>

        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold text-slate-800">
              Skills
            </h2>

            <div className="mt-3 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-slate-100 px-3 py-2 text-xs text-slate-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default JobDetails;