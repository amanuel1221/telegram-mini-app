import api from "./axios";

export const getAllPdfs = async () => {
  const { data } = await api.get("/pdfs");
  return data;
};
export const uploadPdf = async (formData) => {
  const { data } = await api.post(
    "/pdfs/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export const getPdfById = async (id) => {
  const { data } = await api.get(`/pdfs/${id}`);
  return data;
};
export const getMyPdfs = async () => {
  const { data } = await api.get("/pdfs/my-files");
  return data;
};
export const deletePdf = async (id) => {

  const { data } = await api.delete(
    `/pdfs/${id}`
  );

  return data;

};
export const updatePdf = async (id, payload) => {

  const { data } = await api.put(
    `/pdfs/${id}`,
    payload
  );

  return data;

};

export const getPdfViewerUrl = (id) =>
  `https://telegram-lms-backend.onrender.com/pdfs/${id}/view`;