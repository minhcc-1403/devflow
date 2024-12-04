export type UserQuestionActivity = {
  _id: string;
  userId: string;
  votedQuestions: string[];
  downVotedQuestions: string[];
  savedQuestions: string[];
  createdAt: string;
  updatedAt: string;
};
