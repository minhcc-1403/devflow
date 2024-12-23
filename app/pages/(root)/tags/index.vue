<script setup lang="ts">
import { tagApi } from "~/apis/devflow/2-tag.api";
import type { Tag } from "~/types/2-tag.type";
import { TagFilters } from "~/utils/constants/filters";

const route = useRoute();
const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const filter = route.query.filter?.toString();
  const page = route.query._page?.toString() || undefined;

  const query = {};

  if (page) Object.assign(query, { _page: page });

  if (q)
    Object.assign(query, {
      name: new RegExp(q, "i").toString(),
    });

  switch (filter) {
    case "popular":
      Object.assign(query, { _sort: "-questionCount" });
      break;

    case "recent":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "name":
      Object.assign(query, { _sort: "name" });
      break;

    case "old":
      Object.assign(query, { _sort: "createdAt" });
      break;
  }

  return query;
});

const { data, status, error } = useAsyncData(
  () => tagApi.paginate<Tag>({ ...queryParams.value, _limit: 12 }),
  {
    watch: [queryParams],
  },
);
</script>

<template>
  <div>
    <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
      <h1 class="h1-bold text-dark100_light900">All Tags</h1>
    </div>

    <div
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <LocalSearchbar
        href="/community"
        icon-position="left"
        img-src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        placeholder="Search for tags"
        other-classes="flex-1"
      />

      <Filter
        :filters="TagFilters"
        other-classes="min-h-[56px] sm:min-w-[170px]"
      />
    </div>

    <TagsLoading v-if="status === 'pending' && !data?.data" />
    <Error v-else-if="error" :error="error" />

    <template v-else>
      <NoResult
        v-if="!data?.data?.length"
        title="No Tags Found"
        description="It looks like there no tags found."
        link="/ask-question"
        link-title="Ask a question"
      />

      <template v-else>
        <section
          class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          <TagCard
            v-for="tag in data.data"
            :key="tag._id"
            :_id="tag._id"
            :tag="tag"
          />
        </section>

        <PaginationInfo :data="data.paginationInfo" />
      </template>
    </template>
  </div>
</template>
