export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  isActive: boolean;
  status: string;
  verificationDate: string;
  accountBalance: number;
  equityBalance: number;
  depositBalance: number;
  rewardBalance: number;
  creditBalance: number;
  profitBalance: number;
}

export interface FetchUserQuery {
  search: string;
  criteria: string;
  startDate: string;
  endDate: string;
  page: number;
  pageSize: number;
}

export interface FetchUserResponse {
  success: boolean;
  data: [];
  total: number;
  totalPages: number;
}
