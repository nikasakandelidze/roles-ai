export type User = {
  id: string;
  email: string;
  accessToken: string;
  imageLink: string;
};

export enum ProgressState {
  IDLE = "IDLE",
  IN_PROGRESS = "IN_PROGRESS",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
