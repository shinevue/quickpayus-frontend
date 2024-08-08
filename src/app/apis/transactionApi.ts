import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import {
  FetchTransactionResponse,
  UpdateTransactionResponse,
  TransactionFetchQuery,
  TransactionUpdateQuery,
} from "@/types/TransactionType";

export const fetchTransaction = async ({
  type,
  status,
  page,
}: TransactionFetchQuery): Promise<FetchTransactionResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchTransactionResponse> = await API.get(
        `/admin/transactions`,
        { params: { type, status, page } }
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

export const updateTransaction = async ({
  reason,
  status,
  id,
}: TransactionUpdateQuery): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    console.log(status, id);
    try {
      const response: AxiosResponse<UpdateTransactionResponse> = await API.post(
        `/admin/transactions/status/update`,
        { status, transactionId: id, reason }
      );
      resolve(response.data.success);
    } catch (error) {
      reject(error);
    }
  });
};
