import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    updateSettingField(state, action) {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
  },
});

export const { updateSettingField } = settingSlice.actions;

export default settingSlice.reducer;
