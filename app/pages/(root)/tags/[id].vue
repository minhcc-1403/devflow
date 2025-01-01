<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const tagId = useRoute().params.id as string;

const route = useRoute();
const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const page = route.query._page?.toString() || undefined;

  const query = {};
  if (q) {
    Object.assign(query, {
      "_oneOf.title": new RegExp(q, "i").toString(),
      "_oneOf.content": new RegExp(q, "i").toString(),
    });
  }

  if (page) Object.assign(query, { _page: page });

  return query;
});

const { data, status, error } = useAsyncData(
  `questions_tag_${tagId}`,
  () =>
    questionApi.paginate<QuestionLoadMore>({
      tagIds: tagId,
      _sort: "-createdAt",
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 5,
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);
</script>

<template>
  <div>
    <h1 class="h1-bold text-dark100_light900">Tags Questions</h1>

    <div class="mt-11 w-full">
      <LocalSearchbar
        href="/community"
        icon-position="left"
        img-src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        placeholder="Search for amazing minds"
        other-classes="flex-1"
      />
    </div>

    <QuestionsLoading v-if="status === 'pending' && !data?.data" />
    <Error v-else-if="error" :error="error" />
    <template v-else>
      <NoResult
        v-if="!data?.data?.length"
        title="There are no tag question to show"
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
