<script setup lang="ts">
defineProps<{
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}>();
</script>

<template>
  <NuxtLink class="flex justify-between gap-2" :to="`/tags/${_id}`">
    <Badge
      class="subtle-medium bg-light800_dark300 text-light400_light500 line-clamp-1 inline-flex items-center rounded-md border border-none border-transparent px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
      >{{ name }}</Badge
    >

    <p v-if="showCount" class="small-medium text-dark500_light700">
      {{ totalQuestions }}
    </p>
  </NuxtLink>
</template>
