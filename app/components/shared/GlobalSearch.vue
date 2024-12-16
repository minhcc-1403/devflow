<script setup lang="ts">
import { cn } from "@/lib/utils";

const route = useRoute();
const search = ref(route.query.global?.toString() || undefined);
const isOpen = ref(false);

const handleSearch = useDebounceFn((e: string | number) => {
  search.value = e.toString() || undefined;

  if (!isOpen.value) isOpen.value = true;
  if (!search.value && isOpen.value) isOpen.value = false;

  useRouter().push({
    query: { ...route.query, global: search.value },
  });
}, 300);
</script>

<template>
  <div class="relative w-full max-w-[600px] max-lg:hidden">
    <div
      class="bg-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
    >
      <NuxtImg
        src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        alt="Search icon"
        width="24"
        height="24"
        class="cursor-pointer"
      />

      <Input
        :model-value="search"
        @update:model-value="handleSearch"
        placeholder="Search..."
        :class="
          cn(
            'paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent',
          )
        "
      />
    </div>

    <GlobalResult v-if="isOpen" />
  </div>
</template>
