<script setup lang="ts">
import { QuestionFilters } from "~/utils/constants/filters";

const authStore = useAuthStore();
const { myQuestionActivity } = storeToRefs(authStore);
</script>

<template>
  <h1 class="h1-bold text-dark100_light900">Saved Questions</h1>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/community"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for amazing minds"
      otherClasses="flex-1"
    />

    <Filter
      :filters="QuestionFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
    />
  </div>

  <SavedQuestions
    v-if="myQuestionActivity?.savedQuestions.length"
    :questionIds="myQuestionActivity.savedQuestions"
  />

  <NoResult
    v-else
    title="There are no question to show"
    description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
    link="/ask-question"
    linkTitle="Ask a Question"
  />
</template>
