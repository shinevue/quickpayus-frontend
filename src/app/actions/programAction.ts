import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProgram, updateProgram } from "../apis/programApi";
import { ReferralProgramType } from "@/types/ProgramType";

export const fetchProgramAsync = createAsyncThunk(
  "program/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchProgram();

      return response.data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateProgramAsync = createAsyncThunk(
  "program/update",
  async (data: ReferralProgramType[], { rejectWithValue }) => {
    try {
      const response = await updateProgram(data);

      return {
        ...response.data,
        data,
      };
    } catch (err) {
      rejectWithValue(err);
    }
  }
);
