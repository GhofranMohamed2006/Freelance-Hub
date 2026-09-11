import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

console.log("API_URL:", API_URL);

const categoryApi = axios.create({
  baseURL: API_URL,
});

export const getCategories = async () => {
  const response = await categoryApi.get("/categories");

  return response.data;
};
