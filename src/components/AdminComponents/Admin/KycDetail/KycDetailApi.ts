import { API } from "@/utils/api";

export const getAllKycs = async (query) => {
  try {
    const response = await API.get(`/admin/users/`, { params: query });

    if (response.statusText === "OK") {
      return response.data;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const updateKyc = async (reqData: { status: string, reason: string, uuid: string }) => {
  try {
    const response = await API.put(`/admin/users/update/kyc`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};