import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchRankAsync, updateRankAsync } from "../actions/rankAction";
import { RankState } from "@/types/RankType";

const initialState: RankState = {
  status: "idle",
  totalCount: 0,
  totalPages: 0,
  ranks: [],
};

export const rankSlice = createSlice({
  name: "rank",
  initialState,
  reducers: {
    setProgram: (state, action: PayloadAction<[]>) => {
      state.ranks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRankAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRankAsync.fulfilled, (state, action) => {
        const { ranks, totalCount, totalPages } = action.payload;
        state.ranks = ranks;
        state.totalCount = totalCount;
        state.totalPages = totalPages;
        state.status = "idle";
      })
      .addCase(fetchRankAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateRankAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateRankAsync.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const rank = state.ranks.find((tr) => tr.rankId === id);
        console.log(rank);
        if (rank) {
          rank.status = status;
        }
      });
  },
});

export const selectRanks = (state: { rank: RankState }) => state.rank.ranks;

export const { setProgram } = rankSlice.actions;
export default rankSlice.reducer;
