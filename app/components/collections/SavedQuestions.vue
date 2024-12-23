<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const props = defineProps<{
  questionIds: string[];
}>();

const route = useRoute();
const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const filter = route.query.filter?.toString();
  const page = route.query._page?.toString() || undefined;

  const query = {};
  if (q) {
    Object.assign(query, {
      "_oneOf.title": new RegExp(q, "i").toString(),
      "_oneOf.content": new RegExp(q, "i").toString(),
    });
  }

  if (page) {
    Object.assign(query, { _page: page });
  }

  switch (filter) {
    case "most_recent":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "oldest":
      Object.assign(query, { _sort: "createdAt" });
      break;

    case "most_voted":
      Object.assign(query, { _sort: "-upvoteCount" });
      break;

    case "most_viewed":
      Object.assign(query, { _sort: "-views" });
      break;

    case "most_answered":
      Object.assign(query, { _sort: "-answerCount" });
      break;
  }

  return query;
});
const { data, status, error } = useAsyncData(
  `questions_${props.questionIds.join(",")}`,
  () =>
    questionApi.paginate<QuestionLoadMore>({
      _id: props.questionIds.join(","),
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 8,
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);
</script>

<template>
  <div>
    <QuestionsLoading v-if="status === 'pending' && !data?.data" />
    <Error v-else-if="error" :error="error" />

    <template v-else>
      <NoResult
        v-if="!data?.data?.length"
        title="There are no question saved to show"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
        link="/ask-question"
        link-title="Ask a Question"
      />

      <section v-else class="mt-10 flex w-full flex-col gap-6">
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
        />

        <PaginationInfo :data="data.paginationInfo" />
      </section>
    </template>
  </div>
</template>
