import api from "./axios";

export const getJobs = async (params = {}) => {
    const response = await api.get("/jobs", {
        params,
    });

    return response.data;
};