import { createSlice } from "@reduxjs/toolkit";

type TypeState = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  answer_1?: string;
  answer_2?: string;
  answer_3?: string;
  otp?: string;
};

const initialState: TypeState = {};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    addFirstStepInfo: (state, { payload }) => {
      state.email = payload.email ? payload.email : state.email;
      state.password = payload.password ? payload.password : state.password;
      state.confirmPassword = payload.confirmPassword
        ? payload.confirmPassword
        : state.confirmPassword;
      state.otp = payload.otp ? payload.otp : state.otp;
    },
    anullateState: (state) => {
      state = {};
      Object.assign(state, {});
      return {};
    },
  },
});

export const { actions: loginActions, reducer } = loginSlice;
