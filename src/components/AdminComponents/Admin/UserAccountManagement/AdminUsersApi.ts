import { API } from "@/utils/api";
import { User } from "@/types/UserType";

export const addGuest = async (reqData: User) => {
  try {
    const response = await API.post(`/admin/users/`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const getAllGuests = async (query) => {
  try {
    const response = await API.get(`/admin/users/`, { params: query });

    if (response.statusText === "OK") {
      return response.data;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const editGuest = async (id: number, reqData: User) => {
  try {
    const response = await API.put(`/admin/users/${id}`, reqData);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const suspendGuest = async (id: number) => {
  try {
    const response = await API.put(`/admin/users/suspend/${id}`, {
      isActive: false,
    });
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const activeGuest = async (id: number) => {
  try {
    const response = await API.put(`/admin/users/suspend/${id}`, {
      isActive: true,
    });
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const delGuest = async (id: number) => {
  try {
    const response = await API.delete(`/admin/users/${id}`);
    if (response.statusText === "OK") {
      return true;
    } else return false;
  } catch (erro) {
    return false;
  }
};
