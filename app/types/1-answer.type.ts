import type { User } from "~/types/pre-built/2-user";

export type Answer = {
  _id: string;
  authorId: User;
  questionId: string;
  content: string;
  upvotes: string[];
  downvotes: string[];
  createdAt: string;
  updatedAt: string;
};
