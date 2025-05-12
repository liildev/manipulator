import type { LoginRequest, LoginResponse, UserResponse } from '@/types/api';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { RootState } from '.';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.user?.accessToken;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: { ...credentials, expiresInMins: 30 },
      }),
    }),
    getCurrentUser: builder.query<UserResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery } = api;
