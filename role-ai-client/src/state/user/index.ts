import {
  InitialUserCheckProgressState,
  ProgressState,
  User,
} from "../../common/model";
import axios, { AxiosError } from "axios";
import { action, makeObservable, observable, runInAction } from "mobx";
import { USER_LOCAL_STORAGE_KEY } from "../../common/constants";

export type ActionProgress = {
  state: ProgressState;
  message: string | null;
};

export class UserState {
  user: User | null = null;
  loginProgress: ActionProgress = { state: "IDLE", message: null };
  registerProgress: ActionProgress = { state: "IDLE", message: null };
  initialUserCheckStatus: InitialUserCheckProgressState = "IDLE";

  constructor() {
    makeObservable(this, {
      user: observable,
      loginProgress: observable,
      registerProgress: observable,
      initialUserCheckStatus: observable,
      login: action,
      register: action,
      updateUser: action,
      updateLoginProgressState: action,
      updateRegisterProgressState: action,
      finalizeLogin: action,
      checkToken: action,
      resetUser: action,
      updateCheckWasFinished: action,
    });
  }

  updateCheckWasFinished = (status: InitialUserCheckProgressState) => {
    this.initialUserCheckStatus = status;
  };

  resetUser = async () => {
    this.user = null;
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  };

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
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
  };

  checkToken = async () => {
    this.updateCheckWasFinished("IN_PROGRESS");
    const userString: string | null = localStorage.getItem(
      USER_LOCAL_STORAGE_KEY,
    );
    if (userString) {
      const user: User = JSON.parse(userString);
      try {
        const response = await axios.get("http://localhost:3001/api/check", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        if (response.status === 200) {
          runInAction(() => {
            this.user = {
              id: user.id,
              email: user.email,
              accessToken: user.accessToken,
            };
          });
        }
        this.updateCheckWasFinished("FINISHED");
      } catch (err: any) {
        console.log(err);
        const aerr: AxiosError = err as AxiosError;
        if (aerr.response?.status === 401) {
          this.resetUser();
        }
        this.updateCheckWasFinished("FINISHED");
      }
    } else {
      this.updateCheckWasFinished("FINISHED");
    }
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
