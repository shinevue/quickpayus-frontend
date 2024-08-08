import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRank, updateRank } from "../apis/rankApi";
import { RankFetchQuery, RankUpdateQuery } from "@/types/RankType";

export const fetchRankAsync = createAsyncThunk(
  "rank/fetch",
  async (
    { status, criteria, searchQuery, page }: RankFetchQuery,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchRank({ status, criteria, searchQuery, page });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateRankAsync = createAsyncThunk(
  "rank/update",
  async ({ status, id, reason }: RankUpdateQuery, { rejectWithValue }) => {
    try {
      const result: boolean = await updateRank({ status, id, reason });
      if (result) {
        return {
          id,
          status,
        };
      }
      return { id: "", status: "" };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
