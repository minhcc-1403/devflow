import { z } from "zod";

export const UpdateUserQuestionActivitySchema = z.object({
  questionId: z.string(),
});

export type UpdateUserQuestionActivity = z.infer<
  typeof UpdateUserQuestionActivitySchema
>;
