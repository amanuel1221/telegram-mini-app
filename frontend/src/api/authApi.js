import api from "./axios";

export const getAllUsers = async () => {
  const { data } = await api.get("/users");

  return data;
};

export const login = async (initDataRaw) => {
  const { data } = await api.post("/auth/login", {
    initDataRaw,
  });

  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/auth/me");

  return data;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");

  return data;
};

export const checkMembership = async () => {
  const { data } = await api.patch("/auth/check-membership");

  return data;
};

export const promoteUser = async (id) => {
  const { data } = await api.patch(
    `/users/${id}/promote`
  );

  return data;
};