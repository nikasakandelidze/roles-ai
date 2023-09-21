export const JWT_SECRET = "SECRET";

export const TASK_QUEUE_TOPICS = {
  CHARACTER_SUGGESTED_PROMPTS_FILL: "CHARACTER_SUGGESTED_PROMPTS_FILL",
};

export const FILL_IN_SUGGESTED_PROMPTS = (context: string, audience: string) =>
  `Please suggest top 4 most useful prompts, each maximum 4-5 words, for ChatGPT if it was instructed to ${context} and ${audience} `;
