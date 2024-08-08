import { API } from "@/utils/api";
import { NotifyData } from "./components/UserNotifications";

export const addNotification = async (reqData: NotifyData) => {
  try {
    const response = await API.post(`/admin/notifications/`, reqData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getNotification = async () => {
  try {
    const response = await API.get(`/admin/notifications/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const editNotification = async (id: string, reqData: NotifyData) => {
  try {
    const response = await API.put(`/admin/notifications/${id}`, reqData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const delNotification = async (id: string) => {
  try {
    const response = await API.delete(`/admin/notifications/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};
