import api from "./axios.js";

export const getFreelancers = async () => {
  const response = await api.get("/users", {
    params: {
      role: "freelancer",
    },
  });

  return response.data;
};