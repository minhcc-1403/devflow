import { z } from "zod";

export const CreateAnswerSchema = z.object({
  content: z.string().min(15),
  questionId: z.string(),
  parentId: z.string().optional(),
});

export const UpdateAnswerSchema = CreateAnswerSchema.partial();

export type CreateAnswer = z.infer<typeof CreateAnswerSchema>;
export type UpdateAnswer = z.infer<typeof UpdateAnswerSchema>;
