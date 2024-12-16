<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";

const route = useRoute();

const queryParams = computed(() => {
  const global = route.query.global?.toString();
  const type = route.query.type?.toString();

  const query = {};
  if (global) {
    Object.assign(query, {
      "_oneOf.title": new RegExp(global, "i").toString(),
      "_oneOf.content": new RegExp(global, "i").toString(),
    });
  }

  switch (type) {
    case "newest":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "recommended":
      // handle fetch recommended questions
      break;

    case "frequent":
      Object.assign(query, { _sort: "-views" });
      break;

    case "unanswered":
      Object.assign(query, { answerCount: 0 });
      break;
  }

  return query;
});

const { data, status } = useAsyncData(
  () => {
    return questionApi.getAll(queryParams.value);
  },
  {
    watch: [queryParams],
  },
);

const results = ref([
  {
    type: "question",
    id: "1",
    title: "Next.js",
  },
  {
    type: "tag",
    id: "2",
    title: "Nextjs",
  },
  {
    type: "user",
    id: "3",
    title: "John Doe",
  },
]);

const renderLink = (type: string, id: string) => "";
</script>

<template>
  <div
    class="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400"
  >
    <p class="text-dark300_light900 paragraph-semibold px-5">Filters</p>

    <div class="my-5 h-[1px] bg-light-700/50 dark:bg-dark-500/50" />

    <div class="space-y-5">
      <p class="text-dark300_light900 paragraph-semibold px-5">Top Match</p>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="flex-center flex-col px-5">
        <Icon
          name="ion:reload"
          class="my-2 size-10 animate-spin text-main-500"
        />

        <p class="text-dark200_light800 body-regular">
          Browsing the entire database
        </p>
      </div>

      <!-- Results -->
      <div v-else class="flex flex-col gap-2">
        <NuxtLink
          v-if="results?.length"
          v-for="(item, index) in results"
          :key="`${item.type}-${item.id}-${index}`"
          :to="renderLink(item.type, item.id)"
          class="flex w-full cursor-pointer items-start gap-3 px-5 py-2.5 hover:bg-light-700/50 dark:hover:bg-dark-500/50"
        >
          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/tag.svg"
            width="18"
            height="18"
            class="invert-colors mt-1 object-contain"
          />

          <div class="flex flex-col">
            <p class="body-medium text-dark200_light800 line-clamp-1">
              {{ item.title }}
            </p>
            <p class="text-light400_light500 mt-1 text-xs font-bold capitalize">
              {{ item.type }}
            </p>
          </div>
        </NuxtLink>

        <div v-else class="flex-center px5 flex-col">
          <p class="text-dark200_light800 body-regular px-5 py-2.5">
            Oops, no results found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
