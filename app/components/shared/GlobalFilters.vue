<script setup lang="ts">
import { GlobalSearchFilters } from "~/utils/constants/filters";

const route = useRoute();
const router = useRouter();

const active = ref(route.query.filter?.toString() || undefined);

const handleTypeClick = (type: string) => {
  active.value = active.value === type ? undefined : type;
  router.push({ query: { ...route.query, type: active.value } });
};
</script>

<template>
  <div class="flex items-center gap-5 px-5">
    <p class="text-dark300_light900 body-medium">Type:</p>
    <div class="flex gap-3">
      <button
        v-for="item in GlobalSearchFilters"
        :key="item.value"
        type="button"
        class="light-border-2 small-medium rounded-2xl px-5 py-2 capitalize dark:text-light-800 dark:hover:text-main-500"
        :class="{
          'bg-main-500 text-light-900': active === item.value,
          'bg-light-700 text-dark-400 hover:text-main-500 dark:bg-dark-500':
            active !== item.value,
        }"
        @click="handleTypeClick(item.value)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>
