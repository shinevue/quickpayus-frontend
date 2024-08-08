import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import { FetchUserQuery, FetchUserResponse } from "@/types/UserType";

export const fetchUser = async (
  payload: FetchUserQuery
): Promise<FetchUserResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchUserResponse> = await API.get(
        `/admin/users`,
        { params: payload }
      );
      if (response.data.success) {
        const data = response.data;
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};
