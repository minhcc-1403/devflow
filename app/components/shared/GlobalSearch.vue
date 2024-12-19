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
  if (
    searchContainerRef.value &&
    // @ts-ignore
    !searchContainerRef.value.contains(event.target)
  ) {
    useRouter().push({
      query: { ...route.query, global: undefined, type: undefined },
    });
  }
};

watch(isOpen, () => {
  isOpen.value
    ? document.addEventListener("click", handleOutsideClick)
    : document.removeEventListener("click", handleOutsideClick);
});
</script>

<template>
  <div
    class="relative w-full max-w-[600px] max-lg:hidden"
    ref="searchContainerRef"
  >
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
