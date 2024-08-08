import { API } from "@/utils/api";
import { AxiosResponse } from "axios";
import {
  FetchProgramResponse,
  UpdateProgramResponse,
} from "@/types/ProgramType";
export const fetchProgram = async (): Promise<{ data: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response: AxiosResponse<FetchProgramResponse> =
        await API.get<FetchProgramResponse>("/programs");
      if (response.data.success) {
        const data = response.data;
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const updateProgram = async (program: any): Promise<{ data: any }> => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(program);
      const response = await API.put<UpdateProgramResponse>("/programs", {
        program,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

export declare const userAPI: {
  updateById<Response>(id: string, fields: {}): { data: Response };
};
