<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const props = defineProps<{
  userId: string;
}>();

const questions = useState<QuestionLoadMore[]>("questions", () => []);

callOnce(`profile_questions_${props.userId}`, async () => {
  const res = await questionApi.paginate({
    _sort: "-createdAt",
    _populate: "tagIds,authorId",
    _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
    _limit: 5,
    authorId: props.userId,
  });

  questions.value = res.data as QuestionLoadMore[];
});
</script>

<template>
  <QuestionCard
    v-if="questions.length"
    v-for="question in questions"
    :key="question._id"
    :_id="question._id"
    :title="question.title"
    :tags="question.tagIds"
    :author="question.authorId"
    :upvotes="question.upvoteCount"
    :views="question.views"
    :createdAt="new Date(question.createdAt)"
    :userId="userId"
  />

  <NoResult
    v-else
    title="There are no questions to show"
    description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
    link="/ask-question"
    linkTitle="Ask a Question"
  />
</template>
