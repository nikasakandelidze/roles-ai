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
};

export type CreateCharacter = Pick<Character, "name" | "context">;

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";
