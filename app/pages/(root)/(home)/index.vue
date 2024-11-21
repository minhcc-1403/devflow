<script setup lang="ts">
import { HomePageFilters } from "~/utils/constants/filters";

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
    <h1 class="h1-bold text-dark100_light900">All Questions</h1>

    <NuxtLink to="/ask-question" class="flex justify-end max-sm:w-full">
      <Button class="primary-gradient min-h-[46px] px-4 py-3 text-gray-100"
        >Ask a Question</Button
      >
    </NuxtLink>
  </div>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for questions"
      otherClasses="flex-1"
    />

    <Filter
      :filters="HomePageFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      containerClasses="hidden max-md:flex"
    />
  </div>

  <HomeFilters />
</template>
