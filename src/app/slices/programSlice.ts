import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProgramAsync,
  updateProgramAsync,
} from "../actions/programAction";
interface ProgramState {
  status: "idle" | "loading";
  programs: [];
}

const initialState: ProgramState = {
  status: "idle",
  programs: [],
};

export const programSlice = createSlice({
  name: "program",
  initialState,
  reducers: {
    setProgram: (state, action: PayloadAction<[]>) => {
      state.programs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProgramAsync.fulfilled, (state, action) => {
        state.programs = action.payload;
        state.status = "idle";
      })
      .addCase(fetchProgramAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateProgramAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProgramAsync.fulfilled, (state, action) => {
        if (action.payload?.success) {
          state.programs = action.payload.data;
        }
        state.status = "idle";
      })
      .addCase(updateProgramAsync.rejected, (state) => {
        state.status = "idle";
      });
  },
});

export const selectPrograms = (state: { program: ProgramState }) =>
  state.program.programs;

export const { setProgram } = programSlice.actions;
export default programSlice.reducer;
