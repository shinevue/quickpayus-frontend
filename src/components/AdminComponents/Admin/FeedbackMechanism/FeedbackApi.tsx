import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import { FetchFeedbackResponse } from "@/types/FeedbackType";

export const fetchFeedbacks = async (
  payload: any
): Promise<FetchFeedbackResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchFeedbackResponse> = await API.get(
        `support/feedback`,
        {
          params: payload,
        }
      );
      if (response.data.success) {
        resolve(response.data);
      }
      resolve({
        success: false,
        totalCount: 0,
        feedbacks: [],
      });
    } catch (error) {
      reject(error);
    }
  });
};
