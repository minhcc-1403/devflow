<script setup lang="ts">
defineProps<{
  imgUrl: string;
  value: number;
  title: string;
}>();
</script>

<template>
  <div
    class="light-border bg-light900_dark300 shadow-light-300 flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 dark:shadow-dark-200"
  >
    <NuxtImg :src="imgUrl" width="40" height="40" :alt="title" />

    <div>
      <p class="paragraph-semibold text-dark200_light900">
        {{ value || 0 }}
      </p>
      <p class="body-medium text-dark400_light700">{{ title }}</p>
    </div>
  </div>
</template>
