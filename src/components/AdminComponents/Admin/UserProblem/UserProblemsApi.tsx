import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import {
  FetchTicketResponse,
  SendTicketReplyResponse,
  TicketReplyPayload,
} from "@/types/TicketsType";

export const fetchTickets = async (
  payload: any
): Promise<FetchTicketResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchTicketResponse> = await API.get(
        `support/ticket`,
        {
          params: payload,
        }
      );
      console.log(response.data)
      if (response.data.success) {
        resolve(response.data);
      }
      resolve({
        success: false,
        totalCount: 0,
        tickets: [],
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const sendTicketReply = async (
  payload: TicketReplyPayload
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<SendTicketReplyResponse> = await API.post(
        `support/ticket/reply`,
        payload
      );
      resolve(response.data);
    } catch (error) {
      reject({
        success: false,
        message: "server error",
      });
    }
  });
};
