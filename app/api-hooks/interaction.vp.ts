import { interactionApi } from "~/apis/devflow/3-interaction.api";

export const useViewQuestion = (questionId: string) =>
  useAsyncData("view-question", () => interactionApi.viewQuestion(questionId));
