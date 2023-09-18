import {
  action,
  makeObservable,
  observable,
  runInAction,
  transaction,
} from "mobx";
import { ProgressState, Session } from "../../common/model";
import { ActionProgress, UserState, userStore } from "../user";
import axios, { AxiosError } from "axios";
import { socketService } from "../../common/socket";

export const MESSAGE_TOPIC = "chat";
export class SessionState {
  session: Session | null = null;
  startSessionProgressState: ActionProgress = { state: "IDLE", message: null };
  fetchSessionProgressState: ActionProgress = { state: "IDLE", message: null };
  justCreated = false;

  userStore: UserState;

  constructor(userStore: UserState) {
    this.userStore = userStore;
    makeObservable(this, {
      session: observable,
      startNewSession: action,
      updateSession: action,
      sendMessage: action,
      fetchSession: action,
      updateNewSessionProgressState: action,
      updateFetchSessionProgressState: action,
    });
  }

  sendMessage = async (message: string) => {
    socketService.send(message, MESSAGE_TOPIC);
  };

  updateNewSessionProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.startSessionProgressState = { state, message };
  };

  updateFetchSessionProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.fetchSessionProgressState = { state, message };
  };

  updateSession = (session: Session) => {
    this.session = session;
  };

  startNewSession = async (characterId: string) => {
    try {
      this.updateNewSessionProgressState("IN_PROGRESS", null);
      const response = await axios.post(
        "http://localhost:3001/api/session/start",
        {
          characterId,
        },
        {
          headers: {
            Authorization: `Bearer ${this.userStore.user?.accessToken}`,
          },
        },
      );
      const session: Session = response.data;
      transaction(() => {
        this.updateSession(session);
        this.updateNewSessionProgressState(
          "SUCCESS",
          "Session started successfully",
        );
      });
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
      runInAction(() => {
        this.updateNewSessionProgressState(
          "FAILED",
          err.response?.data?.message || "Failed to start a new session",
        );
      });
    }
  };

  fetchSession = async (id: string) => {
    try {
      this.updateFetchSessionProgressState("IN_PROGRESS", null);
      const response = await axios.get(
        `http://localhost:3001/api/session/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.userStore.user?.accessToken}`,
          },
        },
      );
      const session: Session = response.data;
      transaction(() => {
        this.updateSession(session);
        this.updateFetchSessionProgressState(
          "SUCCESS",
          "Session fetched successfully",
        );
      });
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
      runInAction(() => {
        this.updateFetchSessionProgressState(
          "FAILED",
          err.response?.data?.message || "Failed to fetch session data",
        );
      });
    }
  };
}

export const sessionStore = new SessionState(userStore);
