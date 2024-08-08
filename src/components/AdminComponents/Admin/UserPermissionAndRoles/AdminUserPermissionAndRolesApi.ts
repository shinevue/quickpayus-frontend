import { API } from "@/utils/api";

interface RoleValues {
  roleName: string;
  permissions: string[];
}

export const getRole = async () => {
  try {
    const response = await API.get(`/admin/roles/`);
    if (response.statusText === "OK") {
      return response.data;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const addRole = async (reqData: RoleValues) => {
  try {
    const response = await API.post(`/admin/roles/`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const editRole = async (id: string, reqData: RoleValues) => {
  try {
    const response = await API.put(`/admin/roles/${id}`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const delRole = async (id: string) => {
  try {
    const response = await API.delete(`/admin/roles/${id}`);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};
