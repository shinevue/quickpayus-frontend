import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Announcement {
  _id: string; // Assuming each announcement has a unique ID
  isRead: boolean;
  title: string;
  description: string;
}

interface AnnouncementsState {
  success: boolean;
  total: number;
  totalPages: number;
  data: Announcement[];
}

const initialState: AnnouncementsState = {
  success: false,
  total: 0,
  totalPages: 0,
  data: [],
};

interface SetAnnouncementsPayload {
  success: boolean;
  total: number;
  totalPages: number;
  data: Announcement[];
}

const announcementsSlice = createSlice({
  name: "announcements",
  initialState: initialState,

  reducers: {
    deleteOne: (state, action) => {
      const announcementId = action.payload;
      state.data = state.data.filter(
        (announcement) => announcement._id !== announcementId
      );
    },
    setAnnouncements: (
      state,
      action: PayloadAction<SetAnnouncementsPayload>
    ) => {
      const { success, total, totalPages, data } = action.payload;
      return {
        ...state,
        success,
        total,
        totalPages,
        data: [...state.data, ...data],
      };
    },
    resetAnnouncements: () => initialState,
    readOne: (state, action) => {
      const announcementId = action.payload;
      const index = state.data.findIndex(
        (announcement) => announcement._id === announcementId
      );
      if (index !== -1) {
        state.data[index].isRead = true;
      }
    },
  },
});

export const {
  readOne,
  deleteOne,
  setAnnouncements,
  resetAnnouncements,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
