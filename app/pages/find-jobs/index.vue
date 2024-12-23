<script setup lang="ts">
import { FindJobFilters } from "~/utils/constants/filters";
</script>

<template>
  <div>
    <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
      <h1 class="h1-bold text-dark100_light900">All Jobs</h1>
    </div>

    <div
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <LocalSearchbar
        href="/"
        icon-position="left"
        img-src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        placeholder="Search for jobs"
        other-classes="flex-1"
      />

      <Filter
        :filters="FindJobFilters"
        other-classes="min-h-[56px] sm:min-w-[170px]"
        container-classes="flex"
      />
    </div>

    <section class="mt-12 flex justify-center">
      <NoResult
        title="There are no jobs to show"
        description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
      />
    </section>
  </div>
</template>
