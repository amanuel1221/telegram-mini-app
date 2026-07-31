import api from "./axios";

export const getDashboardStats = async () => {
  const { data } = await api.get("/teacher/dashboard");
  return data;
};