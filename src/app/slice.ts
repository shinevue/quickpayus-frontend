import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTransitionName } from "antd/es/_util/motion";
import { updateKycField } from "./slices/KycVerificationSlice";

// Function to get the token
const getToken = () => {
  return localStorage.getItem("token");
};

// Custom fetchBaseQuery with token
const baseQueryWithToken = fetchBaseQuery({
  baseUrl: "/api/v1",
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) {
      headers.set("token", `${token}`);
    }
    return headers;
  },
});

const createDynamicEndpoint = (method, route) => {
  return {
    query: ({ url, data, id }) => {
      if (id) {
        return {
          url: `${url}/${route}/${id}`,
          method,
          body: data,
        };
      } else {
        return {
          url: `${url}/${route}`,
          method,
          body: data,
        };
      }
    },
  };
};

console.log("createDynamicEndpoint", createDynamicEndpoint("GET", ""));

export const api = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  baseQuery: baseQueryWithToken,
  tagTypes: ["notifications", "getNotifications", "getAnnouncements"],
  endpoints: (builder) => ({
    getRankData: builder.query({
      query: () => `/rank/`,
    }),
    getParentRefferalData: builder.query({
      query: () => `referrals/parent`,
    }),
    getRewardData: builder.query({
      query: () => `/reward/`,
    }),
    getClaimRewardData: builder.query({
      query: () => `/reward/claim-reward`,
    }),
    getReceiverAddressData: builder.query({
      query: () => `/transactions/receiver`,
    }),
    checkUser: builder.query({
      query: () => `/auth/check`,
    }),

    //update

    getUnreadNotificationsCount: builder.query({
      query: () => `/notifications?isRead=false`,
      // method: "GET",
      providesTags: ["notifications"],
    }),
    getNotifications: builder.query({
      query: ({ page }) => `/notifications?page=${page}`,
      // method: "GET",
      providesTags: ["getNotifications"],
    }),
    getAnnouncements: builder.query({
      query: ({ page }) => `/announcements?page=${page}`,
      // method: "GET",
      providesTags: ["getAnnouncements"],
    }),
    getReferralsList: builder.query({
      query: ({ type, level, page }) =>
        `/referrals?type=${type}&level=${level}&page=${page}`,
      // method: "GET",
    }),
    getTransactionsList: builder.query({
      query: ({ transactionType, status, page, from, to }) =>
        `transactions?transactionType=${transactionType}&status=${status}&page=${page}&from=${from}&to=${to}`,
      // method: "GET",
    }),
    getUser: builder.query({
      query: ({ uuid }) => `user/${uuid}`,
      // method: "GET",
    }),
    getData: builder.query(createDynamicEndpoint("GET", "")),
    getProgramsData: builder.query({
      query: () => "/programs",
      // method: "GET",
    }),
    getFAQ: builder.query({
      query: () => "/support/faq",
      // method: "GET",
    }),

    // POST request

    postData: builder.mutation(createDynamicEndpoint("POST", "")),
    sendData: builder.mutation(createDynamicEndpoint("POST", "")),
    postDepositForm: builder.mutation({
      query: (data) => ({
        url: `/transactions/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    updateNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    // updateRead: builder.mutation({
    //   query: (data) => ({
    //     url: `/notifications/${data}`,
    //     method: "PUT",
    //   }),
    //   invalidatesTags: ["notifications"],
    // }),
    // deleteNote: builder.mutation({
    //   query: (data) => ({
    //     url: `/notifications/${data}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["notifications"],
    // }),
    updateKycVerificationData: builder.mutation({
      query: (data) => ({
        url: `/user/update/kyc`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    updateProfileData: builder.mutation({
      query: (data) => ({
        url: `/user/update/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["notifications"],
    }),
    createOPT: builder.mutation({
      query: (data) => ({
        url: `/opt/create`,
        method: "POST",
        body: data,
      }),
    }),
    verifyOPT: builder.mutation({
      query: (data) => ({
        url: `/opt/verify`,
        method: "POST",
        body: data,
      }),
    }),
    fetchBalanceAnalticsForChart: builder.query({
      query: ({ balanceFrame, timeFrame }) =>
        `/analytics/${balanceFrame}/${timeFrame}`,
    }),

    //have to add more post points here where ever the data changes and causes notifications to change
    // putData: builder.mutation(createDynamicEndpoint("PUT", ""), {
    //   invalidatesTags: ["notifications"],
    // }), //
    // deleteData: builder.mutation(createDynamicEndpoint("DELETE", ""), {
    //   invalidatesTags: ["notifications"],
    // }),
    putData: builder.mutation(createDynamicEndpoint("PUT", "")), //
    deleteData: builder.mutation(createDynamicEndpoint("DELETE", "")),
  }),
});

export const {
  useCheckUserQuery,
  useGetUserQuery,
  useGetAnnouncementsQuery,
  useGetProgramsDataQuery,
  useGetNotificationsQuery,
  useGetReferralsListQuery,
  useGetTransactionsListQuery,
  useGetUnreadNotificationsCountQuery,
  useGetDataQuery,
  useUpdateProfileDataMutation,
  usePostDepositFormMutation,
  usePostDataMutation,
  useSendDataMutation,
  usePutDataMutation,
  useUpdateNotificationMutation,
  useDeleteDataMutation,
  useUpdateKycVerificationDataMutation,
  useGetFAQQuery,
  useCreateOPTMutation,
  useVerifyOPTMutation,
  useFetchBalanceAnalticsForChartQuery,
  // useUpdateReadMutation,
  // useDeleteNoteMutation,
} = api;
