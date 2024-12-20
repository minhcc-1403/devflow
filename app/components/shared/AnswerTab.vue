<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const props = defineProps<{
  userId: string;
}>();

const { data: pagination } = useAsyncData(
  `answered_questions_${props.userId}`,
  () =>
    questionApi.paginateQuestionsAnsweredBy<QuestionLoadMore>(props.userId, {
      _sort: "-createdAt",
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 5,
    }),
);
</script>
<template>
  <template v-if="pagination?.data.length">
    <AnswerCard
      v-for="question in pagination.data"
      :key="question._id"
      :_id="question._id"
      :title="question.title"
      :tags="question.tagIds"
      :author="question.authorId"
      :upvotes="question.upvoteCount"
      :views="question.views"
      :created-at="new Date(question.createdAt)"
      :user-id="props.userId"
    />
  </template>

  <NoResult
    v-else
    title="There are no answered questions to show"
    description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
    link="/ask-question"
    link-title="Ask a Question"
  />
</template>
