import { createSlice } from "@reduxjs/toolkit";

interface Notification {
  _id: string; // Assuming each notification has an ID
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
    readOne: (state, action) => {
      const notificationId = action.payload;
      const index = state.data.findIndex(
        (notification) => notification._id === notificationId
      );
      if (index !== -1) {
        state.data[index].isRead = true;
      }
    },
    deleteOne: (state, action) => {
      const notificationId = action.payload;
      state.data = state.data.filter(
        (notification) => notification._id !== notificationId
      );
    },
    setNotifications: (state, action) => {
      const { success, total, totalPages, data } = action.payload;
      return {
        ...state,
        success,
        total,
        totalPages,
        data,
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
  readOne,
  deleteOne,
  setNotifications,
  resetNotifications,
  setNotificationsReadStatus,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
