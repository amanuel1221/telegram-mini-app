import api from "./axios";

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