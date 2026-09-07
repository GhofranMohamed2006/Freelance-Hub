import api from "./axios.js";

export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};
