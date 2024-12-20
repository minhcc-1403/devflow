<script setup lang="ts">
import { generalApi } from "~/apis/devflow/0-general.api";
import { SearchableTypesEnum } from "~/utils/enums";

const route = useRoute();

const queryParams = computed(() => {
  const global = route.query.global?.toString();
  const type = route.query.type?.toString() as SearchableTypesEnum;

  return {
    global,
    type,
  };
});

const { data, status } = useAsyncData(
  () => {
    return generalApi.globalSearch(
      queryParams.value.global!,
      queryParams.value.type,
    );
  },
  {
    watch: [queryParams],
  },
);

const renderLink = (type: SearchableTypesEnum, id: string) => {
  const queryString = Object.entries(queryParams.value)
    .map(([key, value]) => value && `${key}=${value}`)
    .filter(Boolean)
    .join("&");

  switch (type) {
    case SearchableTypesEnum.Question:
      return `/question/${id}?${queryString}`;

    case SearchableTypesEnum.Answer:
      return `/question/${id}?${queryString}`;

    case SearchableTypesEnum.User:
      return `/profile/${id}?${queryString}`;

    case SearchableTypesEnum.Tag:
      return `/tags/${id}?${queryString}`;

    default:
      return `/?${queryString}`;
  }
};
</script>

<template>
  <div
    class="absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-dark-400"
  >
    <GlobalFilters />

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
        <template v-if="data?.length">
          <NuxtLink
            v-for="(item, index) in data"
            :key="`${item.searchType}-${item._id}-${index}`"
            :to="renderLink(item.searchType, item._id)"
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
              <p
                class="text-light400_light500 mt-1 text-xs font-bold capitalize"
              >
                {{ item.searchType }}
              </p>
            </div>
          </NuxtLink>
        </template>

        <div v-else class="flex-center px5 flex-col">
          <p class="text-dark200_light800 body-regular px-5 py-2.5">
            Oops, no results found
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
