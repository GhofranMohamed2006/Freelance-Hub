import api from "./axios.js";

export const getFreelancers = async (search = "") => {
  const response = await api.get("/users", {
    params: {
      role: "freelancer",
      search,
    },
  });

  return response.data;
};

export const getFreelancerProject = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};
export const getFreelancerDashboard = async () => {
  const response = await api.get("/freelancer/dashboard");
  return response.data;
};
export const getFreelancerPayments = async () => {
  const response = await api.get("/payments");
  return response.data;
};

export const updateMilestone = async (projectId, milestoneId, data) => {
  const response = await api.patch(
    `/projects/${projectId}/milestones/${milestoneId}`,
    data,
  );

  return response.data;
};

export const uploadProjectFile = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/uploads", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getPublicProfile = async (id) => {
  const response = await api.get(`/users/${id}/public-profile`);
  return response.data;
};

export const getFreelancerProjects = async () => {
  const response = await api.get("/freelancer/projects");
  return response.data;
};
