import { createSlice } from "@reduxjs/toolkit";

interface Notification   {
  id: string; // Assuming each notification has an ID
  isRead: boolean;
  // Add other notification properties here
}

interface NotificationsState {
  success: boolean;
  total: number;
  totalPages: number;
  data: Notification[];
}

const initialState: NotificationsState = {
  success: false,
  total: 0,
  totalPages: 0,
  data: [],
};

//TODO: create entities for notifications so that we can update the read status of a notification using an id

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,

  reducers: {
    setNotifications: (state, action) => {
      const { success, total, totalPages, data } = action.payload;
      return {
        ...state,
        success,
        total,
        totalPages,
        data: [...state.data, ...data],
      };
    },
    resetNotifications: () => initialState,
    setNotificationsReadStatus: (state) => {
      const dataWithReadStatus = state.data.map((notification) => {
        if (!notification.isRead) {
          return { ...notification, isRead: true };
        }
        return notification;
      });
      return {
        ...state,
        data: dataWithReadStatus,
      };
    },
  },
});

export const {
  setNotifications,
  resetNotifications,
  setNotificationsReadStatus,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
