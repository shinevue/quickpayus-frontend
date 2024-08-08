import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/components/AdminComponents/Auth/authSlice";
import profileSliceReducer from "./profileSlice";
import settingSliceReducer from "./settingSlice";
import analyticsSliceReducer from "./analyticsSlice";

import programReducer from "@/app/slices/programSlice";
import { api } from "./slice";

import transactionReducer from "@/app/slices/transactionSlice";
import rankReducer from "@/app/slices/rankSlice";
import notificationsReducer from '@/app/slices/notificationsSlice';
import announcementsReducer from '@/app/slices/announcementsSlice';
import kycVerificationReducer from '@/app/slices/KycVerificationSlice';
import otpSliceReducer from "@/app/slices/otpSlice";
import userReducer from "@/app/slices/userSlice";


export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    profile: profileSliceReducer,
    setting: settingSliceReducer,
    program: programReducer,
    analytics: analyticsSliceReducer,
    transaction: transactionReducer,
    rank: rankReducer,
    notifications: notificationsReducer,
    announcements: announcementsReducer,
    kycVerification: kycVerificationReducer,
    otpStatus: otpSliceReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
