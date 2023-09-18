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
  user?: User;
  createdAt?: string;
  updatedAt?: string;
};

export type Chat = {
  id: string;
  author?: User;
  isBot: boolean;
  content: string;
  visible: boolean;
  createdAt: string;
  updatedAt: string;
  session?: Session;
};

export type Session = {
  id: string;
  title: string;
  character: Character;
  user?: User;
  chat: Chat[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreateCharacter = Pick<Character, "name" | "context" | "audience">;

export type ProgressState = "IDLE" | "IN_PROGRESS" | "SUCCESS" | "FAILED";

export type InitialUserCheckProgressState = "IDLE" | "IN_PROGRESS" | "FINISHED";
