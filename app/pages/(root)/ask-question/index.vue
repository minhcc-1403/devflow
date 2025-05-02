<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

<template>
  <div>
    <h1 class="h1-bold text-dark100_light900">Ask a question</h1>

    <div class="mt-9">
      <QuestionForm type="Create" />
    </div>
  </div>
</template>
