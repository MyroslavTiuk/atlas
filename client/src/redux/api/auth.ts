import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthBody } from "../../utils/types";

const baseUrl = process.env.REACT_DEFAULT_API;

interface IAuthRequest {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  body: IAuthBody;
}

export const authApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    auth: builder.mutation<IAuthBody, IAuthRequest>({
      query: ({ url, method, body }) => ({
        url: `user/${url}`,
        method,
        body,
      }),
    }),
    logout: builder.mutation<any, any>({
      query: ({ refresh }) => ({
        url: "user/logout/",
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
        method: "POST",
        body: {
          refresh_token: refresh,
        },
      }),
    }),
  }),
});

export const { useAuthMutation, useLogoutMutation } = authApi;
