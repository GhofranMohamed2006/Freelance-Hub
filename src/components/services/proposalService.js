import api from "../../api/axios";

export const createProposal = async (proposalData) => {
  const response = await api.post("/proposals", proposalData);
  return response.data;
};

export const getProposalsByJob = async (jobId) => {
  const response = await api.get("/proposals", {
    params: { 
      jobId,
    },
  });
  return response.data;
};

export const updateProposalStatus = async (proposalId, status) => {
  const response = await api.patch(`/proposals/${proposalId}`, { status });
  return response.data;
};

export const getProposalById = async (proposalId) => {
  const response = await api.get(`/proposals/${proposalId}`);
  return response.data;
};