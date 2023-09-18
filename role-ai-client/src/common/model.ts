export type User = {
  id: string;
  email: string;
  accessToken: string;
  imageLink?: string;
};

export type Character = {
  id: string;
  name: string;
  context: string;
  characterImage: string;
  audience: string;
};

export type CreateCharacter = Pick<Character, "name" | "context" | "audience">;

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";

export type InitialUserCheckProgressState = "IDLE" | "IN_PROGRESS" | "FINISHED";
