import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OtpState {
  status: 'pending' | 'verified' | 'failed';
}

const initialState: OtpState = {
  status: 'pending',
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    updateOtpStatus: (state, action: PayloadAction<'verified' | 'failed'>) => {
      state.status = action.payload;
    },
  },
});

export const { updateOtpStatus } = otpSlice.actions;
export default otpSlice.reducer;