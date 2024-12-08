<script setup lang="ts">
import { useQuestionsSavedLoadMore } from "~/api-hooks/question.vq";

const props = defineProps<{
  questionIds: string[];
}>();
const listEl = ref<HTMLElement | null>(null);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

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

    <template v-else-if="questions.length">
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
      />

      <!-- Load more -->
      <span v-show="hasLoadMore && !isLoading" ref="listEl" />
    </template>

    <QuestionCardLoading v-if="isLoading" v-for="i in 3" :key="i" />
  </div>
</template>

<style lang="scss" scoped></style>
