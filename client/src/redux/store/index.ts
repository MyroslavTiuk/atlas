import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { authApi } from "../api/auth";
import { homeApi } from "../api/home";

export const store = configureStore({
  reducer: {
    reducers,
    [authApi.reducerPath]: authApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, homeApi.middleware),
});

export type ReducersType = ReturnType<typeof store.getState>;
