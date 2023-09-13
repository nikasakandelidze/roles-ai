import { create } from "zustand";
import { ProgressState, User } from "../../common/model";
import axios from "axios";

export interface UserState {
  user: User | null;
  loginProgress: { state: ProgressState; message: string | null };
  login: (email: string, password: string) => void;
  registerProgress: { state: ProgressState; message: string | null };
  register: (email: string, password: string, confirmPassword: string) => void;
  logout: () => void;
  resetLoginProgress: () => void;
  resetRegisterProgress: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loginProgress: { state: ProgressState.IDLE, message: null },
  login: async (email: string, password: string) => {
    try {
      set({
        loginProgress: { state: ProgressState.IN_PROGRESS, message: null },
      });
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      const user: User = response.data;
      set({
        user,
        loginProgress: {
          state: ProgressState.SUCCESS,
          message: "Successfully logged in",
        },
      });
    } catch (err: any) {
      console.log(err);
      set({
        loginProgress: {
          state: ProgressState.FAILED,
          message: err.response.data.message,
        },
      });
    }
  },
  registerProgress: {
    state: ProgressState.IDLE,
    message: null,
  },
  register: async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      set({
        registerProgress: { state: ProgressState.IN_PROGRESS, message: null },
      });
      await axios.post("http://localhost:3001/api/register", {
        email,
        password,
        confirmPassword,
      });
      set({
        registerProgress: {
          state: ProgressState.SUCCESS,
          message: "Successfully registered",
        },
      });
    } catch (err: any) {
      console.log(err);
      set({
        registerProgress: {
          state: ProgressState.FAILED,
          message: err.response.data.message,
        },
      });
    }
  },
  logout: () => {
    set({ user: null });
  },
  resetLoginProgress: () => {
    set({ loginProgress: { state: ProgressState.IDLE, message: null } });
  },
  resetRegisterProgress: () => {
    set({ registerProgress: { state: ProgressState.IDLE, message: null } });
  },
}));
