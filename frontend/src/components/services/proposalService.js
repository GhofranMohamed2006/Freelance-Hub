import api from "../../api/axios";

export const createProposal = async (proposalData) => {
  const response = await api.post("/proposals", proposalData);
  return response.data;
};

export const getProposalsByJob = async (jobId = "") => {
  try {
    const response = await api.get("/proposals", {
      params: jobId ? { jobId } : {},
    });

    return response.data?.data ?? response.data ?? [];
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load proposals";

    throw new Error(message, { cause: error });
  }
};

export const updateProposalStatus = async (proposalId, status) => {
  try {
    const response = await api.patch(`/proposals/${proposalId}`, { status });
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to update proposal status";

    throw new Error(message, { cause: error });
  }
};

export const getProposalById = async (proposalId) => {
  const response = await api.get(`/proposals/${proposalId}`);
  return response.data;
};
