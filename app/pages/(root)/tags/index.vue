<script setup lang="ts">
import { useTagsPagination } from "~/api-hooks/tag.vq";
import { TagFilters } from "~/utils/constants/filters";

const { data } = useTagsPagination();
</script>

<template>
  <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
    <h1 class="h1-bold text-dark100_light900">All Tags</h1>
  </div>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/community"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for tags"
      otherClasses="flex-1"
    />

    <Filter
      :filters="TagFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
    />
  </div>

  <section
    class="mt-12 grid grid-cols-3 gap-4 max-sm:grid-cols-1"
    v-if="data?.data.length"
  >
    <div v-for="tag in data.data" :key="tag._id">
      <TagCard :_id="tag._id" :tag="tag" />
    </div>
  </section>

  <NoResult
    v-else
    title="No Tags Found"
    description="It looks like there no tags found."
    link="/ask-question"
    link-title="Ask a question"
  />
</template>
