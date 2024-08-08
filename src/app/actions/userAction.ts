import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../apis/userApi";
import { FetchUserQuery } from "@/types/UserType";

export const fetchUserAsync = createAsyncThunk(
  "rank/fetch",
  async (
    { search, criteria, startDate, endDate, page, pageSize }: FetchUserQuery,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchUser({
        search,
        criteria,
        startDate,
        endDate,
        page,
        pageSize,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
