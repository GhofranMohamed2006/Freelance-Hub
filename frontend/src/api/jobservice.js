import api from "./axios";

export const getJobs = async (params = {}) => {
    const response = await api.get("/jobs", {
        params,
    });

    return response.data;
};
export const getJob = async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
};
