import { API } from "@/utils/api";

export const getSystemNotification = async () => {
  try {
    const response = await API.get(`/admin/notifications/`);
    if (response.statusText === "OK") {
      console.log(response.data);

      return response.data;
    } else return {};
  } catch (erro) {
    return {};
  }
};

export const delSystemNotification = async (id: number) => {
  try {
    const response = await API.delete(`/admin/notifications/${id}`);
    if (response.statusText === "OK") {
      console.log(response.data);
      7;

      return response.data;
    } else return {};
  } catch (erro) {
    return {};
  }
};
