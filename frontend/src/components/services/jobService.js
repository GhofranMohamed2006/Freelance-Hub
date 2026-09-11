import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "/api";

const jobApi = axios.create({
  baseURL: API_URL,
});

export const createJob = async (jobData) => {
  const token = localStorage.getItem("lynk_token");

  try {
    const response = await jobApi.post("/jobs", jobData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("ERROR RESPONSE:", error.response?.data);
    console.log("REQUEST HEADERS:", error.config?.headers);

    throw error;
  }
};
