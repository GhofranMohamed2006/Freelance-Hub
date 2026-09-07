import api from "./axios";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
export const getMe = async (credentials) => {
  const response = await api.get("/auth/me", credentials);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.patch(`/users/${id}`, userData);
  return response.data;
};

export const changePassword = async (currentPassword, newPassword) => {
  const response = await api.patch("/auth/password", {
    currentPassword,
    newPassword,
  });
  return response.data;
};

export const saveNotifications = async (notifications) => {
  const response = await api.put("/settings/notifications", notifications);
  return response.data;
};
