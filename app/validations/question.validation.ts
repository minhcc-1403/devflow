import { z } from "zod";

export const CreateQuestionSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(5)
    .max(130),
  content: z.string().min(15),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export const UpdateQuestionSchema = CreateQuestionSchema.partial();
export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
export type UpdateQuestion = z.infer<typeof UpdateQuestionSchema>;
