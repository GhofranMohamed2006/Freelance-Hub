import api from "./axios";

export const getPublicProfile = async (id) => {
    const response = await api.get(`/users/${id}/public-profile`);
    return response.data;
};