export const JWT_SECRET = "SECRET";

export const TASK_QUEUE_TOPICS = {
  CHARACTER_SUGGESTED_PROMPTS_FILL: "CHARACTER_SUGGESTED_PROMPTS_FILL",
};

export const FILL_IN_SUGGESTED_PROMPTS = (context: string, audience: string) =>
  `Please suggest top 4 most useful prompts, each maximum 4-5 words, for ChatGPT if it was instructed to ${context} and ${audience} `;

export const SUMMARY_PROMPT = `Give me list of 10 most important and informative topics that on a high level summarizes things we talked about in this conversation. Each topic must be maximum length of 3 words. Return Output as a JSON array of next structure: [{topic: string}]`;
