import type { Tag } from "~/types/2-tag.type";
import type { User } from "~/types/pre-built/2-user";

export type Question = {
  _id: string;
  authorId: string;
  title: string;
  content: string;
  views: number;
  upvoteCount: number;
  downvoteCount: number;
  answerCount: number;
  createdAt: string;
  updatedAt: string;
};

export type QuestionLoadMore = Question & {
  authorId: User;
  tagIds: Tag[];
};

export type QuestionDetail = Question & {
  authorId: User;
  tagIds: Tag[];
};
