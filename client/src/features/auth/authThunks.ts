// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "@/services/auth.service";
import { setAuth } from "./authSlice";
import type { LoginRequest } from "@/types/auth.types";

export const loginThunk = createAsyncThunk<void, LoginRequest>(
  "auth/login",
  async (credentials, { dispatch }) => {
    const data = await authService.login(credentials);
    dispatch(
      setAuth({
        accessToken: data.tokens.access,
        refreshToken: data.tokens.refresh,
        user: {
          id: String(data.user.id),
          email: data.user.email,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          role: data.user.role,
          avatar: data.user.avatar ?? null,
        },
      })
    );
  }
);
