import type { User } from "~/types/pre-built/2-user";

export type Answer = {
  _id: string;
  authorId: User;
  questionId: string;
  content: string;
  upvoteCount: number;
  downvoteCount: number;
  createdAt: string;
  updatedAt: string;
};
