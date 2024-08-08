import { API } from "@/utils/api";

export const getCurrentProfit = async () => {
  try {
    const response = await API.get(`/admin/profitconfig/`);
    if (response.statusText === "OK") {
      return response.data;
    } else return {};
  } catch (erro) {
    return {};
  }
};

export const upsertProfitConfig = async (data: number[]) => {
  try {
    const response = await API.post(`/admin/profitconfig/`, { profit: data });
    if (response.statusText === "OK") {
      return response.data;
    } else return {};
  } catch (erro: {
    response: { data: { message: string } };
  }) {
    return erro?.response?.data;
  }
};
