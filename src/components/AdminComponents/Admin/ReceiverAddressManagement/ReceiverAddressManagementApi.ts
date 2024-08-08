import { API } from "@/utils/api";

export const getAllAddress = async () => {
  try {
    const response = await API.get(`/admin/receiver/`);

    if (response.statusText === "OK") {
      return response.data;
    } else return false;
  } catch (erro) {
    return false;
  }
};

export const addAddress = async (reqData: {
  oldAddress: string;
  newAddress: string;
}) => {
  try {
    const response = await API.post(`/admin/receiver/`, reqData);
    return response.data;
  } catch (erro) {
    return false;
  }
};


//send otp req
export const requireOTP = async () => {
  try {
    const response = await API.post("/otp/create");
    if (response.data.success) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response.data) {
      return error.response.data;
    }
  }
  return {};
};

//verify otp
export const verifyOTP = async (otp: string) => {
  try {
    const response = await API.post("/otp/verify", { otp });
    if (response.data.success) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response.data) {
      return error.response.data;
    }
  }
  return {};
};
