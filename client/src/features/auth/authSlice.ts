// src/features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store";
import { authService } from "@/services/auth.service";

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  } | null;
}

const storedUser = authService.getStoredUser();
const initialState: AuthState = {
  accessToken: authService.getAccessToken(),
  refreshToken: authService.getRefreshToken(),
  user: storedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      Object.assign(state, action.payload);
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      authService.clearAuthData();
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

/* ───────────── Selectors ───────────── */
export const selectUser = (s: RootState) => s.auth.user;
export const selectRole = (s: RootState) => s.auth.user?.role ?? null;
export const selectIsAuthenticated = (s: RootState) =>
  Boolean(s.auth.accessToken && s.auth.user);

export default authSlice.reducer;
