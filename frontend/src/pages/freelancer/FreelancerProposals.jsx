import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import api from "../../api/axios.js";

const FreelancerProposals = () => {
  const [proposals, setProposals] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/proposals", { params: { status: status || undefined } })
      .then((response) => {
        const data = response.data;
        setProposals(Array.isArray(data) ? data : data.data || []);
      })
      .catch((err) =>
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load proposals",
        ),
      )
      .finally(() => setLoading(false));
  }, [status]);

  const counts = useMemo(
    () => ({
      all: proposals.length,
      pending: proposals.filter((p) => p.status === "pending").length,
      accepted: proposals.filter((p) => p.status === "accepted").length,
      rejected: proposals.filter((p) => p.status === "rejected").length,
    }),
    [proposals],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-slate-900">
            My Proposals
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track the proposals you have submitted.
          </p>
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
        >
          <option value="">All proposals</option>
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        {[
          ["All", counts.all],
          ["Pending", counts.pending],
          ["Accepted", counts.accepted],
          ["Rejected", counts.rejected],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
          </div>
        ))}
      </div>
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}
      {loading ? (
        <div className="rounded-2xl bg-white p-12 text-center text-sm text-slate-500">
          Loading proposals...
        </div>
      ) : proposals.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm">
          <FileText className="mx-auto h-10 w-10 text-slate-300" />
          <h2 className="mt-4 font-semibold text-slate-800">No proposals</h2>
          <p className="mt-1 text-sm text-slate-500">
            Submit a proposal from Find Work.
          </p>
          <Link
            to="/freelancer/find-work"
            className="mt-5 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white"
          >
            Find Work
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <article
              key={proposal.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold text-slate-900">
                    {proposal.jobTitle || proposal.title || "Job Proposal"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    ${proposal.bid || 0} proposed rate
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                  {proposal.status || "pending"}
                </span>
              </div>
              <p className="mt-5 whitespace-pre-line text-sm leading-6 text-slate-600">
                {proposal.coverLetter || "No cover letter provided."}
              </p>
              <div className="mt-5 text-xs text-slate-400">
                Submitted{" "}
                {proposal.createdAt
                  ? new Date(proposal.createdAt).toLocaleDateString()
                  : ""}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
export default FreelancerProposals;
