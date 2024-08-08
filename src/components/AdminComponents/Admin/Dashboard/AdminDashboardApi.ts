import { API } from "@/utils/api";

export const analytics = async () => {
  try {
    const response = await API.get(`/admin/analytics/counts`);
    if (response.statusText === "OK") {
      return response.data;
    } else return {};
  } catch (erro) {
    return {};
  }
};
