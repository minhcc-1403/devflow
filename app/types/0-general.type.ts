export type BadgeCount = {
  gold: number;
  silver: number;
  bronze: number;
};

export type UserBadgeCounts = {
  badgeStats: {
    questionBadges: BadgeCount;
    answerBadges: BadgeCount;
    readQuestionBadges: BadgeCount;
  };
  badgeCounts: BadgeCount;
};
