export interface RankType {
  rewardId: string;
  id: string;
  name: string;
  sales: number;
  directReferrals: number;
  indirectReferrals: number;
  rankId: string;
  reward: number;
  status: string;
  rank: string;
  date: string;
}

export interface FetchRankResponse {
  success: boolean;
  totalCount: number;
  totalPages: number;
  ranks: any;
}

export interface RankFetchQuery {
  status: string;
  criteria: string;
  searchQuery: string;
  page: number;
}

export interface RankState {
  status: string;
  totalCount: number;
  totalPages: number;
  ranks: RankType[];
}

export interface UpdateRankResponse {
  success: boolean;
}

export interface RankUpdateQuery {
  status: string;
  id: string;
  reason?: string;
}
