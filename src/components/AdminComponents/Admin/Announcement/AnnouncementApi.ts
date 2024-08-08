import { API } from "@/utils/api";

export const addAnnouncement = async (reqData) => {
  try {
    const response = await API.post(`/admin/announcements/`, reqData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAnnouncement = async () => {
  try {
    const response = await API.get(`/admin/announcements/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editAnnouncement = async (id: string, reqData: NotifyData) => {
  try {
    const response = await API.put(`/admin/announcements/${id}`, reqData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const delAnnouncement = async (id: string) => {
  try {
    const response = await API.delete(`/admin/announcements/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
