import { createSlice } from "@reduxjs/toolkit";

type kyc = {
  dateOfBirth: any;
  gender: string;
  occupation: string;
  addressLine: string;
  addressLine2: string;
  country: string;
  documentType: string;
  images: any;
  documents: any;
  status?: string;
}

const initialState: kyc = {
  dateOfBirth: "",
  gender: "Male",
  occupation: "",
  addressLine: "",
  addressLine2: "",
  country: "",
  documentType: "ID_CARD",
  images: [],
  documents: [],
};

const kycVerificationSlice = createSlice({
  name: "kyc",
  initialState,
  reducers: {
    updateKycField(state, action) {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };
    },
    updateKyc(state, action) {
      const { data } = action.payload;

      return {
        ...state,
        ...data,
      };
    },
    resetForm() {
      return initialState;
    },
  },
});

export const { updateKycField, updateKyc } = kycVerificationSlice.actions;

export default kycVerificationSlice.reducer;
