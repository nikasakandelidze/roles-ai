export type User = {
  id: string;
  email: string;
  accessToken: string;
  imageLink?: string;
};

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
