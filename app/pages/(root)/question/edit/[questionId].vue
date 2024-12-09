<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import { type QuestionLoadMore } from "~/types/1-question.type";

const { data } = useAsyncData<QuestionLoadMore>("question", () => {
  return questionApi.getById(useRoute().params.questionId as string, {
    _populate: "authorId,tagIds",
  });
});
</script>

<template>
  <h1 class="h1-bold text-dark100_light900">Edit Question</h1>

  <div class="mt-9" v-if="data">
    <QuestionForm type="Edit" :questionDetail="data" />
  </div>
</template>
