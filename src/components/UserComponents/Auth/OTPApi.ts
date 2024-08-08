import { API } from "@/utils/api";

//send otp req
export const requireOTP = async ({ request_type }) => {
  try {
    const response = await API.post("/otp/create", { request_type });
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
