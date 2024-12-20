export type Interaction = {
  _id: string;
  userId: string[];
  action: string;
  questionId?: string;
  answerId?: string;
  tagIds?: string[];
};
