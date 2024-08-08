export interface ReferralSubProgramType {
  level: string;
  creditPercentage: number;
  directReferralsRequired: number;
}

export interface ReferralProgramType {
  level: string;
  data: ReferralSubProgramType[];
}

export interface FetchProgramResponse {
  success: boolean;
  data: ReferralProgramType;
}

export interface UpdateProgramResponse {
  success: boolean;
}
