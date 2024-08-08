import { RootState } from "./store";

export const selectProfile = (state: RootState) => state.profile;

export const selectTransactionPageCount = (state: RootState) =>
  state.transaction.totalPages;

export const selectTransactionsCount = (state: RootState) =>
  state.transaction.totalCount;

export const selectRankPageCount = (state: RootState) => state.rank.totalPages;

export const selectRanksCount = (state: RootState) => state.rank.totalCount;

export const selectSetting = (state: RootState) => state.setting;

export const selectAnalytics = (state: RootState) => state.analytics;

export const selectNotifications = (state: RootState) => state.notifications;

export const selectAnnouncements = (state: RootState) => state.announcements;

export const selectKycVerification = (state: RootState) => state.kycVerification;

export const selectOtpStatus = (state: RootState) => state.otpStatus;
