<script setup lang="ts">
import { useQuestionsSavedLoadMore } from "~/api-hooks/question.vq";
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const props = defineProps<{
  questionIds: string[];
}>();
const listEl = ref<HTMLElement | null>(null);

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
const { data } = useAsyncData(
  () =>
    questionApi.paginate<QuestionLoadMore>({
      _id: props.questionIds.join(","),
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 5,
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);

const { questions, isLoading, hasLoadMore, loadMore } =
  useQuestionsSavedLoadMore(props.questionIds);

useInfiniteScroll(listEl, loadMore, { distance: 5 });
</script>

<template>
  <div class="mt-10 flex w-full flex-col gap-6">
    <QuestionCardLoading
      v-if="!questions.length && isLoading"
      v-for="i in 3"
      :key="i"
    />

    <template v-else-if="data?.data.length">
      <QuestionCard
        v-for="question in data.data"
        :key="question._id"
        :_id="question._id"
        :title="question.title"
        :tags="question.tagIds"
        :author="question.authorId"
        :upvotes="question.upvoteCount"
        :views="question.views"
        :createdAt="new Date(question.createdAt)"
      />

      <!-- Load more -->
      <span v-show="hasLoadMore && !isLoading" ref="listEl" />
    </template>

    <QuestionCardLoading v-if="isLoading" v-for="i in 3" :key="i" />

    <PaginationInfo
      v-if="data?.paginationInfo && data?.paginationInfo._totalPages > 1"
      :data="data.paginationInfo"
    />
  </div>
</template>

<style lang="scss" scoped></style>
