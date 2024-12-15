<script setup lang="ts">
const listEl = ref<HTMLElement | null>(null);

import { useQuestionsLoadMore } from "~/api-hooks/question.vq";
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";
import { HomePageFilters } from "~/utils/constants/filters";

const route = useRoute();
const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const filter = route.query.filter?.toString();

  const query = {};
  if (q)
    Object.assign(query, {
      "_oneOf.title": new RegExp(q, "i").toString(),
      "_oneOf.content": new RegExp(q, "i").toString(),
    });

  switch (filter) {
    case "newest":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "recommended":
      // handle fetch recommended questions
      break;

    case "frequent":
      Object.assign(query, { _sort: "-views" });

      break;
    case "unanswered":
      Object.assign(query, { answerCount: 0 });
      break;
  }

  return query;
});
const { data } = useAsyncData(
  () =>
    questionApi.paginate<QuestionLoadMore>({
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 5,
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);

const { questions, isLoading, hasLoadMore, loadMore } = useQuestionsLoadMore();

useInfiniteScroll(listEl, loadMore, { distance: 5 });
</script>

<template>
  <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
    <h1 class="h1-bold text-dark100_light900">All Questions</h1>
    {{ queryParams }}

    <NuxtLink to="/ask-question" class="flex justify-end max-sm:w-full">
      <Button class="primary-gradient min-h-[46px] px-4 py-3 text-gray-100"
        >Ask a Question</Button
      >
    </NuxtLink>
  </div>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for questions"
      otherClasses="flex-1"
    />

    <Filter
      :filters="HomePageFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      containerClasses="hidden max-md:flex"
    />
  </div>

  <HomeFilters />

  <div class="mt-10 flex w-full flex-col gap-6">
    <QuestionCardLoading
      v-if="!questions.length && isLoading"
      v-for="i in 3"
      :key="i"
    />

    <template v-else-if="data?.data?.length">
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

    <NoResult
      v-else
      title="There are no question saved to show"
      description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
      link="/ask-question"
      linkTitle="Ask a Question"
    />

    <QuestionCardLoading v-if="isLoading" v-for="i in 3" :key="i" />
  </div>
</template>
