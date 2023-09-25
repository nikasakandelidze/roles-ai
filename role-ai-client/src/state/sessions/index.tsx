import {
  action,
  makeObservable,
  observable,
  runInAction,
  transaction,
} from "mobx";
import {
  Chat,
  ChatMessageInput,
  ProgressState,
  Session,
} from "../../common/model";
import { ActionProgress, UserState, userStore } from "../user";
import axios, { AxiosError } from "axios";
import { SocketService } from "../../common/socket";

export const USER_MESSAGE_TOPIC_INPUT = "CHAT_INPUT";
export const BOT_MESSAGE_TOPIC_OUTPUT = "CHAT_OUTPUT";
export const USER_LATEST_CHAT_UPDATE = "USER_CHAT_UPDATE";
export const BOT_FINISH_CHAT_UPDATE = "CHAT_OUTPUT_FINISH";
export class SessionState {
  session: Session | null = null;
  sessionHistory: Session[] = [];
  startSessionProgressState: ActionProgress = { state: "IDLE", message: null };
  fetchSessionProgressState: ActionProgress = { state: "IDLE", message: null };
  fetchSessionHistoryProgressState: ActionProgress = {
    state: "IDLE",
    message: null,
  };

  userStore: UserState;

  constructor(userStore: UserState) {
    this.userStore = userStore;
    makeObservable(this, {
      session: observable,
      sessionHistory: observable,
      startSessionProgressState: observable,
      fetchSessionProgressState: observable,
      fetchSessionHistoryProgressState: observable,
      startNewSession: action,
      updateSession: action,
      sendMessage: action,
      fetchSession: action,
      updateNewSessionProgressState: action,
      updateFetchSessionProgressState: action,
      updateLatestChatOfUser: action,
      updateBotChatOutput: action,
      finishBotOutputUpdate: action,
      fetchSessionHistory: action,
      updateFetchSessionHistoryProgressState: action,
      updateSessionHistory: action,
      finishSession: action,
    });
  }

  updateSessionHistory = (sessions: Session[]) => {
    this.sessionHistory = sessions;
  };

  finishSession = async (sessionId: string) => {
    try {
      await axios.post(
        `http://localhost:3001/api/session/${sessionId}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${this.userStore.user?.accessToken}`,
          },
        },
      );
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
    }
  };

  updateFetchSessionHistoryProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.fetchSessionHistoryProgressState = {
      state,
      message,
    };
  };

  fetchSessionHistory = async () => {
    try {
      this.updateFetchSessionHistoryProgressState("IN_PROGRESS", null);
      const response = await axios.get("http://localhost:3001/api/session", {
        headers: {
          Authorization: `Bearer ${this.userStore.user?.accessToken}`,
        },
      });
      const sessions: { sessions: Session[] } = response.data;
      transaction(() => {
        this.updateSessionHistory(sessions.sessions);
        this.updateFetchSessionHistoryProgressState(
          "SUCCESS",
          "Sessions history fetched successfully",
        );
      });
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
      runInAction(() => {
        this.updateFetchSessionHistoryProgressState(
          "FAILED",
          err.response?.data?.message || "Failed to fetch sessions history",
        );
      });
    }
  };

  sendMessage = async (
    message: ChatMessageInput,
    socketService: SocketService,
  ) => {
    socketService.send(message, USER_MESSAGE_TOPIC_INPUT);
    this.session?.chat.push({
      id: "USER_INPUT_MOCK_ID_TO_BE_UPDATED",
      author: this.userStore.user,
      isBot: false,
      content: message.chat.content,
      visible: true,
    });
    this.session?.chat.push({
      id: "BOT_OUTPUT_MOCK_ID_TO_BE_UPDATED",
      author: this.userStore.user,
      isBot: true,
      content: "",
      visible: true,
    });
  };

  updateLatestChatOfUser = async (chat: Chat) => {
    const latestChat: Chat | undefined = this.session?.chat.find(
      (c: Chat) => c.id === "USER_INPUT_MOCK_ID_TO_BE_UPDATED",
    );
    if (latestChat) {
      latestChat.id = chat.id;
      latestChat.author = chat.author;
      latestChat.createdAt = chat.createdAt;
      latestChat.isBot = chat.isBot;
      latestChat.session = chat.session;
      latestChat.visible = chat.visible;
      latestChat.content = chat.content;
    } else {
      console.log(
        "Failed to find latest user chat that needs to be updated but received websocket data for it",
      );
    }
  };

  updateBotChatOutput = async (text: string) => {
    const botOutput: Chat | undefined = this.session?.chat.find(
      (c: Chat) => c.id === "BOT_OUTPUT_MOCK_ID_TO_BE_UPDATED",
    );
    if (botOutput) {
      botOutput.content = botOutput.content + text;
    }
  };

  finishBotOutputUpdate = async (chat: Chat) => {
    const botChat: Chat | undefined = this.session?.chat.find(
      (c: Chat) => c.id === "BOT_OUTPUT_MOCK_ID_TO_BE_UPDATED",
    );
    if (botChat) {
      botChat.id = chat.id;
      botChat.author = chat.author;
      botChat.createdAt = chat.createdAt;
      botChat.isBot = chat.isBot;
      botChat.session = chat.session;
      botChat.visible = chat.visible;
      botChat.content = chat.content;
    } else {
      console.log(
        "Failed to find bot chat that needs to be updated but received websocket data for it",
      );
    }
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
