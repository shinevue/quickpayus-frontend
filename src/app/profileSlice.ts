import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  gender: "male",
  countryCode: "+93",
  phoneNumber: 6256,
  alertNotifications: true,
  emailNotifications: true,
  avatarBg: "",
  role: "",
  kyc: {}
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile(state, action) {
      const { data } = action.payload;
      return {
        ...state,
        ...data,
      };
    },
    updateProfileField(state, action) {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { updateProfileField, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
