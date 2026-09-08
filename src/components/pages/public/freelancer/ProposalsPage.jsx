import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProposalsByJob, updateProposalStatus } from "../../../services/proposalService";

const ProposalsPage = () => {
  const { jobId } = useParams(); 
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getProposalsByJob(jobId || "1");
        setProposals(Array.isArray(data) ? data : data.proposals || []);
      } catch (err) {
        console.error("Error fetching proposals:", err);
        setError(err.response?.data?.message || "Failed to load the submitted proposals");
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, [jobId]);

  const handleStatusChange = async (proposalId, newStatus) => {
    try {
      await updateProposalStatus(proposalId, newStatus);
      setProposals((prev) =>
        prev.map((p) => (p._id === proposalId || p.id === proposalId ? { ...p, status: newStatus } : p))
      );
      alert(`The display proposal has been changed to: ${newStatus}`);
    } catch (err) {
      alert("Display proposal update failed: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Proposals are loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto my-6 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Submitted Proposals</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and evaluate proposals submitted by freelancers
          </p>
        </div>
        <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
          Total: {proposals.length}
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {proposals.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-500">
          No proposals have been received for this job yet
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => {
            const id = proposal._id || proposal.id;
            const freelancerName = proposal.freelancer?.name || "Freelancer";
            const rate = proposal.proposedRate || proposal.rate || 0;

            return (
              <div
                key={id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{freelancerName}</h3>
                    <p className="text-sm text-gray-500">{proposal.freelancer?.email}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-indigo-600">${rate}</span>
                    <span className="text-xs text-gray-400 block">/ hour</span>
                  </div>
                </div>

                <div className="py-4">
                  <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Cover Letter
                  </h4>
                  <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                    {proposal.coverLetter}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-gray-100">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      proposal.status === "accepted"
                        ? "bg-emerald-100 text-emerald-700"
                        : proposal.status === "rejected"
                        ? "bg-rose-100 text-rose-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    Status: {proposal.status || "pending"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStatusChange(id, "rejected")}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleStatusChange(id, "accepted")}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition"
                    >
                      Accept Proposal
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProposalsPage;