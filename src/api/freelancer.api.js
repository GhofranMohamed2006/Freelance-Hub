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
  const response = await api.get(`http://localhost:5000/api/users/${id}/public-profile`);
  return response.data;
};

export const updatePublicProfile = async (id, updatedData) => {
  const response = await api.patch(`http://localhost:5000/api/users/${id}`, updatedData);
  return response.data;
};