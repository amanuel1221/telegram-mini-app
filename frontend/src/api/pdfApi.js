import api from "./axios";

export const getAllPdfs = async () => {
  const { data } = await api.get("/pdfs");
  return data;
};

export const getPdfById = async (id) => {
  const { data } = await api.get(`/pdfs/${id}`);
  return data;
};

export const getPdfViewerUrl = (id) => {
  return `${api.defaults.baseURL}/pdfs/${id}/view`;
};