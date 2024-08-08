import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTransactionAsync,
  updateTransactionAsync,
} from "../actions/transactionAction";
import { TransactionState } from "@/types/TransactionType";

const initialState: TransactionState = {
  status: "idle",
  totalCount: 0,
  totalPages: 0,
  transactions: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setProgram: (state, action: PayloadAction<[]>) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransactionAsync.fulfilled, (state, action) => {
        const { transactions, totalCount, totalPages } = action.payload;
        state.transactions = transactions;
        state.totalCount = totalCount;
        state.totalPages = totalPages;
        state.status = "idle";
      })
      .addCase(fetchTransactionAsync.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(updateTransactionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTransactionAsync.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const transaction = state.transactions.find(
          (tr) => tr.transactionId === id
        );
        console.log(transaction);
        if (transaction) {
          transaction.status = status;
        }
      });
  },
});

export const selectTranctions = (state: { transaction: TransactionState }) =>
  state.transaction.transactions;

export const { setProgram } = transactionSlice.actions;
export default transactionSlice.reducer;
