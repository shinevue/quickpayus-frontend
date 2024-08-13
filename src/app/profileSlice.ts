import { createSlice } from "@reduxjs/toolkit";
import { checkAuthAsync } from "@/components/AdminComponents/Auth/authSlice";

type profile = {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  gender: string;
  countryCode: string;
  phoneNumber: number;
  alertNotifications: boolean;
  emailNotifications: boolean;
  avatarBg: string;
  kyc: any;
  role: string;
  twofactor: boolean;
  investmentLevel?: string; // Add this line
  uuid?: string;
  isEnableMFA?: boolean;
  depositBalance?: number;
  profitBalance?: number;
  rewardBalance?: number;
  id?: any;
};

const initialState: profile = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  email: "",
  gender: "male",
  countryCode: "+93",
  phoneNumber: 6256,
  alertNotifications: true,
  emailNotifications: true,
  avatarBg: "",
  kyc: {},
  role: "",
  twofactor: false,
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
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        const { data } = action.payload;
        return {
          ...state,
          ...data,
        };
      })
      .addCase(checkAuthAsync.rejected, () => {
        return initialState;
      });
  },
});

export const { updateProfileField, updateProfile, resetForm } =
  profileSlice.actions;

export default profileSlice.reducer;
