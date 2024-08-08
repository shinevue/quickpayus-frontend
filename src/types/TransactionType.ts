export interface TransactionType {
  _id: string;
  date: string;
  user: string;
  transactionId: string;
  type: string;
  amount: string;
  status: string;
}

export interface FetchTransactionResponse {
  success: boolean;
  totalCount: number;
  totalPages: number;
  transactions: any;
}

export interface TransactionFetchQuery {
  type: string;
  status: string;
  page: number;
}

export interface TransactionState {
  status: string;
  totalCount: number;
  totalPages: number;
  transactions: TransactionType[];
}

export interface TransactionUpdateQuery {
  status: string;
  id: string;
  reason?: string;
}

export interface UpdateTransactionResponse {
  success: boolean;
}
