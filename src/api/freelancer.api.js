import api from "./axios.js";

export const getFreelancers = async (search = "", category = "") => {
  const response = await api.get("/users", {
    params: {
      role: "freelancer",
      search,
      category,
    },
  });

  return response.data;
};

export const getFreelancerProject = async (id) => {
  try {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to load project";

    throw new Error(message, { cause: error });
  }
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

export const updatePublicProfile = async (id, updatedData) => {
  const response = await api.patch(`/users/${id}`, updatedData);

  return response.data;
};

export const getFreelancerProjects = async () => {
  const response = await api.get("/freelancer/projects");
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};

export const getFreelancerConversations = async () => {
  const response = await api.get("/messages/conversations");

  return response.data;
};

export const getFreelancerMessages = async (conversationId) => {
  const response = await api.get("/messages", {
    params: {
      conversationId,
    },
  });

  return response.data;
};

export const sendFreelancerMessage = async (
  conversationId,
  recipientId,
  content,
) => {
  const response = await api.post("/messages", {
    conversationId,
    recipientId,
    content,
  });

  return response.data;
};

export const markFreelancerMessageRead = async (messageId) => {
  const response = await api.post(`/messages/${messageId}/read`);

  return response.data;
};

export const updateFreelancerMessage = async (messageId, data) => {
  const response = await api.patch(`/messages/${messageId}`, data);

  return response.data;
};

export const deleteFreelancerMessage = async (messageId) => {
  const response = await api.delete(`/messages/${messageId}`);

  return response.data;
};
