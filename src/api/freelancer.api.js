import api from "./axios.js";

export const getFreelancers = async () => {
  const response = await api.get("/users", {
    params: {
      role: "freelancer",
    },
  });

  return response.data;
};

export const getPublicProfile = async (id) => {
  const response = await api.get(`/users/${id}/public-profile`);
  return response.data;
};