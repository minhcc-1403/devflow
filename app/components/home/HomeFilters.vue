<script setup lang="ts">
import { HomePageFilters } from "~/utils/constants/filters";

const urlSearchParam = useUrlSearchParams();
const active = ref(urlSearchParam.tag?.toString() || "");

const handleTypeClick = (item: string) => {
  if (active.value === item) {
    delete urlSearchParam.tag;
    active.value = "";
  } else {
    urlSearchParam.tag = item;
    active.value = item;
  }
};
</script>

<template>
  <div class="mt-10 hidden flex-wrap gap-3 md:flex">
    <Button
      v-for="item in HomePageFilters"
      :key="item.value"
      class="body-medium rounded-lg px-6 py-3 capitalize shadow-none"
      :class="`${active === item.value ? 'bg-main-100 text-main-500 hover:bg-main-100/80' : 'bg-light-800 text-light-500 hover:bg-light-800/90 dark:bg-dark-300 dark:text-gray-100 dark:hover:bg-dark-300/80'}`"
      @click="handleTypeClick(item.value)"
    >
      {{ item.name }}
    </Button>
  </div>
</template>
