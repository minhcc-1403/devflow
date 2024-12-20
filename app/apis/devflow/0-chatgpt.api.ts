import { authFetch } from "~/utils/fetch";

const GENERAL_URL = "/chatgpt";
export const chatgptApi = {
  //  ----- Method: GET -----
  generateAIAnswer: (question: string): Promise<{ reply: string }> => {
    return authFetch.post(`${GENERAL_URL}/generate-ai-answer`, { question });
  },
};
