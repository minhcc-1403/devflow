<script setup lang="ts">
import { HomePageFilters } from "~/utils/constants/filters";

const active = "newest";
</script>

<template>
  <div class="mt-10 hidden flex-wrap gap-3 md:flex">
    <Button
      v-for="item in HomePageFilters"
      :key="item.value"
      class="body-medium rounded-lg px-6 py-3 capitalize shadow-none"
      :class="`${active === item.value ? 'bg-main-100 text-main-500' : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-400 dark:text-gray-100'}`"
    >
      {{ item.name }}
    </Button>
  </div>
</template>
