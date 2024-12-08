<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const tagId = useRoute().params.id as string;

const questions = useState<QuestionLoadMore[] | null>(
  `questions_tag_${tagId}`,
  () => null,
);
const isLoading = computed(() => !questions.value);

await callOnce(tagId, async () => {
  const { data, paginationInfo } = await questionApi.paginate({
    tagIds: tagId,
    _sort: "-createdAt",
    _populate: "tagIds,authorId",
    _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
    _limit: 5,
  });

  questions.value = data as QuestionLoadMore[];
});
</script>

<template>
  <h1 class="h1-bold text-dark100_light900">Tags Questions</h1>

  <div class="mt-11 w-full">
    <LocalSearchbar
      route="/community"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for amazing minds"
      otherClasses="flex-1"
    />
  </div>

  <div class="mt-10 flex w-full flex-col gap-6">
    <QuestionCardLoading
      v-if="!questions?.length && isLoading"
      v-for="i in 3"
      :key="i"
    />

    <template v-else-if="questions?.length">
      <QuestionCard
        v-for="question in questions"
        :key="question._id"
        :_id="question._id"
        :title="question.title"
        :tags="question.tagIds"
        :author="question.authorId"
        :upvotes="question.upvoteCount"
        :views="question.views"
        :createdAt="new Date(question.createdAt)"
        :userId="question.authorId._id"
      />

      <QuestionCardLoading v-if="isLoading" v-for="i in 3" :key="i" />
    </template>

    <NoResult
      v-else
      title="There are no tag question to show"
      description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
    discussion. our query could be the next big thing others learn from. Get
    involved! 💡"
      link="/ask-question"
      linkTitle="Ask a Question"
    />
  </div>
</template>
