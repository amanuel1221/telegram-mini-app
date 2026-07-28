import api from "./axios";

export const getAllPdfs = async () => {
  const { data } = await api.get("/pdfs");
  return data;
};

export const getPdfById = async (id) => {
  const { data } = await api.get(`/pdfs/${id}`);
  return data;
};

export const getPdfViewerUrl = (id) =>
  `https://telegram-lms-backend.onrender.com/pdfs/${id}/view`;