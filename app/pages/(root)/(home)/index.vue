<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";
import { HomePageFilters } from "~/utils/constants/filters";

const route = useRoute();
const { user } = storeToRefs(useAuthStore());
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

  if (page) Object.assign(query, { _page: page });

  switch (filter) {
    case "newest":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "recommended":
      if (user.value?._id) {
        // handle fetch recommended questions
      } else {
        // handle fetch popular questions
      }
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

const { data, status, error } = useAsyncData(
  () =>
    questionApi.paginate<QuestionLoadMore>({
      _populate: "tagIds,authorId",
      _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
      _limit: 10,
      ...queryParams.value,
    }),
  {
    getCachedData(key, nuxtApp) {
      const res = nuxtApp.payload.data[key];

      if (res) {
        useRouter().push({
          query: {
            _page: res.paginationInfo._page,
          },
        });
      }

      return res;
    },
    watch: [queryParams],
  },
);

// const listEl = ref<HTMLElement | null>(null);
// useInfiniteScroll(listEl, loadMore, { distance: 5 });
</script>

<template>
  <div>
    <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
      <h1 class="h1-bold text-dark100_light900">All Questions</h1>

      <NuxtLink to="/ask-question" class="flex justify-end max-sm:w-full">
        <Button class="primary-gradient min-h-[46px] px-4 py-3 text-gray-100"
          >Ask a Question</Button
        >
      </NuxtLink>
    </div>

    <div
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <LocalSearchbar
        href="/"
        icon-position="left"
        img-src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        placeholder="Search for questions"
        other-classes="flex-1"
      />

      <Filter
        :filters="HomePageFilters"
        other-classes="min-h-[56px] sm:min-w-[170px]"
        container-classes="hidden max-md:flex"
      />
    </div>

    <HomeFilters />

    <!-- Load questions -->
    <QuestionsLoading v-if="status === 'pending' && !data?.data" />
    <Error v-else-if="error" :error="error" />

    <template v-else>
      <NoResult
        v-if="!data?.data?.length"
        title="There are no questions to show"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
        link="/ask-question"
        link-title="Ask a Question"
      />

      <template v-else>
        <section class="mt-10 flex w-full flex-col gap-6">
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
        </section>

        <PaginationInfo :data="data.paginationInfo" />
      </template>
    </template>

    <!-- Load more -->
    <!-- <span
          v-show="data.paginationInfo._nextPage && status === 'pending'"
          ref="listEl"
        /> -->
  </div>
</template>
