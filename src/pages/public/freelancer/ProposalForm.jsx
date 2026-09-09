import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createProposal } from "../../../components/services/proposalService";

const SubmitProposalPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedRate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await createProposal({
        jobId: jobId || "1",
        coverLetter: formData.coverLetter,
        proposedRate: Number(formData.proposedRate),
      });

      alert("Proposal was successfully delivered!");
      navigate("/freelancer/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred during the proposal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit a Proposal</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Proposed Rate ($/hr)
          </label>
          <input
            type="number"
            min="1"
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            placeholder="e.g. 25"
            value={formData.proposedRate}
            onChange={(e) => setFormData({ ...formData, proposedRate: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Letter
          </label>
          <textarea
            rows={6}
            required
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            placeholder="Explain why you are the best candidate for this project..."
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium cursor-pointer transition"
          >
            {loading ? "Submitting..." : "Submit Proposal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitProposalPage;