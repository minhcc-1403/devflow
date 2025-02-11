<script setup lang="ts">
import { cn } from "@/lib/utils";

const route = useRoute();
const search = computed(() => route.query?.global?.toString());
const isOpen = computed(() => !!route.query?.global?.toString());

const handleSearch = useDebounceFn((e: string | number) => {
  const value = e.toString() || undefined;

  useRouter().push({
    query: { ...route.query, global: value },
  });
}, 500);

const searchContainerRef = ref<HTMLElement | null>(null);

const handleOutsideClick = (event: any) => {
  if (!searchContainerRef.value?.contains(event.target)) {
    useRouter().push({
      query: { ...route.query, global: undefined, type: undefined },
    });
  }
};

watch(isOpen, () => {
  if (isOpen.value) document.addEventListener("click", handleOutsideClick);
  else document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <div
    ref="searchContainerRef"
    class="relative w-full max-w-[600px] max-lg:hidden"
  >
    <div
      class="bg-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4"
    >
      <!-- <NuxtImg
        src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        alt="Search icon"
        width="24"
        height="24"
        class="cursor-pointer"
      /> -->
      <Icon
        name="fluent:search-20-filled"
        class="text-dark400_light800 size-6 cursor-pointer"
      />

      <Input
        :model-value="search"
        placeholder="Search..."
        :class="
          cn(
            'paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent',
          )
        "
        @update:model-value="handleSearch"
      />
    </div>

    <GlobalResult v-if="isOpen" />
  </div>
</template>
