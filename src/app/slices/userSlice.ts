import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUserAsync } from "../actions/userAction";

interface UsersState {
  status: "idle" | "loading";
  total: number;
  users: [];
}

const initialState: UsersState = {
  status: "idle",
  total: 0,
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProgram: (state, action: PayloadAction<[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        if (action.payload.data) state.users = action.payload.data;
        state.total = action.payload.total;

        state.status = "idle";
      })
      .addCase(fetchUserAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectUsers = (state: { user: UsersState }) => state.user.users;
export const selectTotalUsers = (state: { user: UsersState }) =>
  state.user.total;
export const selectStatusUsersSlice = (state: { user: UsersState }) =>
  state.user.status;

export const {} = usersSlice.actions;
export default usersSlice.reducer;
