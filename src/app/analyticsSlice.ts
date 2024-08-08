import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountBalance: 0,
  principleBalance: 0,
  profitBalance: 0,
  depositBalance: 0,
  equityBalance: 0,
  creditBalance: 0,
  rankRewardBalance: 0,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    updateAnalytics(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
      };
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { updateAnalytics } = analyticsSlice.actions;

export default analyticsSlice.reducer;
