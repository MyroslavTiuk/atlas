import { combineReducers } from "@reduxjs/toolkit";
import { reducer as loginReducer } from "../slices/loginSlice";

export const reducers = combineReducers({
  loginReducer,
});
