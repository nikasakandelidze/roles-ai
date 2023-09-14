import { ProgressState, User } from "../../common/model";
import axios from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";

export type ActionProgress = {
  state: ProgressState;
  message: string | null;
};

export class UserState {
  user: User | null = null;
  loginProgress: ActionProgress = { state: "IDLE", message: null };
  registerProgress: ActionProgress = { state: "IDLE", message: null };

  constructor() {
    makeObservable(this, {
      user: observable,
      loginProgress: observable,
      registerProgress: observable,
      login: action,
      register: action,
      updateUser: action,
      updateLoginProgressState: action,
      updateRegisterProgressState: action,
      finalizeLogin: action,
    });
  }

  finalizeLogin = (user: User) => {
    this.user = {
      id: user.id,
      email: user.email,
      accessToken: user.accessToken,
    };
    this.loginProgress = {
      state: "SUCCESS",
      message: "Successfully logged in",
    };
  };

  login = async (email: string, password: string) => {
    try {
      runInAction(() => {
        this.updateLoginProgressState("IN_PROGRESS", null);
      });
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      const user: User = response.data;
      runInAction(() => {
        this.finalizeLogin(user);
      });
    } catch (err: any) {
      console.log(err);
      runInAction(() => {
        this.updateLoginProgressState(
          "FAILED",
          err.response?.data?.message || "Failed to login",
        );
      });
    }
  };
  register = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      this.updateRegisterProgressState("IN_PROGRESS", null);
      await axios.post("http://localhost:3001/api/register", {
        email,
        password,
        confirmPassword,
      });
      this.updateRegisterProgressState("SUCCESS", "You logged in successfully");
    } catch (err: any) {
      console.log(err);
      this.updateRegisterProgressState(
        "FAILED",
        err.response?.data?.message || "Failed to register",
      );
    }
  };

  updateUser = (user: User) => {
    this.user = { ...user };
  };

  updateLoginProgressState = (state: ProgressState, message: string | null) => {
    this.loginProgress = { state, message };
  };

  updateRegisterProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.registerProgress = { state, message };
  };
}

export const userStore: UserState = new UserState();
