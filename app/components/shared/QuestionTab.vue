<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const props = defineProps<{
  userId: string;
}>();

const route = useRoute();
const queryParams = computed(() => {
  const page = route.query._page?.toString() || undefined;
  const query = {};

  if (page) Object.assign(query, { _page: page });

  return query;
});

const { data, status, error } = useAsyncData(
  `profile_questions_${props.userId}`,
  () =>
    questionApi.paginate<QuestionLoadMore>({
      _sort: "-createdAt",
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 8,
      authorId: props.userId,
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);

onUnmounted(() => {
  useRouter().push({ query: { ...route.query, _page: 1 } }); // reset page
});
</script>

<template>
  <QuestionsLoading v-if="status === 'pending' && !data?.data" />
  <Error v-else-if="error" :error="error" />

  <template v-else>
    <NoResult
      v-if="!data?.data.length"
      title="There are no questions to show"
      description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
      link="/ask-question"
      link-title="Ask a Question"
    />

    <template v-else>
      <QuestionCard
        v-for="question in data.data"
        :key="question._id"
        :_id="question._id"
        :title="question.title"
        :tags="question.tagIds"
        :author="question.authorId"
        :upvotes="question.upvoteCount"
        :answer-count="question.answerCount"
        :views="question.views"
        :created-at="new Date(question.createdAt)"
        :user-id="userId"
      />

      <PaginationInfo :data="data.paginationInfo" />
    </template>
  </template>
</template>
