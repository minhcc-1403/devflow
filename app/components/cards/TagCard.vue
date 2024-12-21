<script setup lang="ts">
import type { Tag } from "~/types/2-tag.type";

defineProps<{
  tag: Tag;
}>();
</script>

<template>
  <NuxtLink :to="`/tags/${tag._id}`" class="shadow-light100_darknone">
    <article
      class="bg-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10"
    >
      <div class="bg-light800_dark400 w-fit rounded-sm px-5 py-1.5">
        <p class="paragraph-semibold text-dark300_light900 line-clamp-1">
          {{ tag.name }}
        </p>
      </div>

      <p class="small-regular text-dark500_light700 mt-4">
        {{ tag.description }}
      </p>

      <p class="small-medium text-dark500_light500 mt-3.5">
        <span class="body-semibold primary-text-gradient mr-2.5">{{
          tag.questionCount
        }}</span>
        + questions
      </p>
    </article>
  </NuxtLink>
</template>
