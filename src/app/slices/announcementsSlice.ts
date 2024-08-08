import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Announcement {
  id: string; // Assuming each announcement has a unique ID
  readStatus: boolean;
  // Include other relevant properties of an announcement
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

//TODO: create entities for announcements so that we can update the read status of a notification using an id

const announcementsSlice = createSlice({
  name: "announcements",
  initialState: initialState,

  reducers: {
    setAnnouncements: (state, action: PayloadAction<SetAnnouncementsPayload>) => {
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
    setAnnouncementsReadStatus: (state, action: PayloadAction<{ id: string; readStatus: boolean }>) => {
      const { id, readStatus } = action.payload;
      const announcementIndex = state.data.findIndex(announcement => announcement.id === id);
      if (announcementIndex !== -1) {
        // Example: toggling read status or setting it
        state.data[announcementIndex].readStatus = readStatus;
      }
    },
  },
});

export const {
  setAnnouncements,
  resetAnnouncements,
  setAnnouncementsReadStatus,
} = announcementsSlice.actions;

export default announcementsSlice.reducer;
