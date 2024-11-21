import { z } from "zod";

export const QuestionSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .trim()
    .min(5)
    .max(130),
  explanation: z.string().min(100),
  tags: z.array(z.string().min(1).max(15)).min(1).max(3),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Category = Question & {
  _id: string;
};
