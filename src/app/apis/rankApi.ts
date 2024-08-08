import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import {
  FetchRankResponse,
  UpdateRankResponse,
  RankFetchQuery,
  RankUpdateQuery,
} from "@/types/RankType";

export const fetchRank = async ({
  status,
  criteria,
  searchQuery,
  page,
}: RankFetchQuery): Promise<FetchRankResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchRankResponse> = await API.get(
        `/admin/ranks`,
        { params: { status, criteria, searchQuery, page } }
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

export const updateRank = async ({
  reason,
  status,
  id,
}: RankUpdateQuery): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    console.log(status, id);
    try {
      const response: AxiosResponse<UpdateRankResponse> = await API.put(
        `/admin/ranks`,
        { status, rewardId: id, reason }
      );
      resolve(response.data.success);
    } catch (error) {
      reject(error);
    }
  });
};
