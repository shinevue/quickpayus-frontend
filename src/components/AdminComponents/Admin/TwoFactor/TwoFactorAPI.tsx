import { API } from "@/utils/api";

//send username,password, email and will receive the role
export const sendAuthPayload = async (payload: {
  username: string;
  password: string;
  email: string;
}) => {
  try {
    const response = await API.post("/auth/checkrole", payload);
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
