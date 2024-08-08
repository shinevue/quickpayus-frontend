import { API } from "@/utils/api";
import { Profile } from "./components/AdminProfile";

export const addProfile = async (reqData: Profile) => {
  try {
    const response = await API.post(`/admin/profile/`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get(`/admin/profile/`);
    if (response.statusText === "OK") {
      return response.data;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const editProfile = async (id: string, reqData: Profile) => {
  try {
    const response = await API.put(`/admin/profile/${id}`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const delProfile = async (id: string) => {
  try {
    const response = await API.delete(`/admin/profile/${id}`);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};
