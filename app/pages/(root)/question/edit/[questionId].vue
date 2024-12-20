<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import type { QuestionLoadMore } from "~/types/1-question.type";

const { data } = useAsyncData<QuestionLoadMore>("question", () => {
  return questionApi.getById(useRoute().params.questionId as string, {
    _populate: "authorId,tagIds",
  });
});
</script>

<template>
  <div>
    <h1 class="h1-bold text-dark100_light900">Edit Question</h1>

    <div v-if="data" class="mt-9">
      <QuestionForm type="Edit" :question-detail="data" />
    </div>
  </div>
</template>
