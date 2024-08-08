import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTransaction, updateTransaction } from "../apis/transactionApi";
import {
  TransactionFetchQuery,
  TransactionUpdateQuery,
} from "@/types/TransactionType";

export const fetchTransactionAsync = createAsyncThunk(
  "transaction/fetch",
  async (
    { type, status, page }: TransactionFetchQuery,
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchTransaction({ type, status, page });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateTransactionAsync = createAsyncThunk(
  "transaction/update",
  async (
    { status, id, reason }: TransactionUpdateQuery,
    { rejectWithValue }
  ) => {
    try {
      const result: boolean = await updateTransaction({ status, id, reason });
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
