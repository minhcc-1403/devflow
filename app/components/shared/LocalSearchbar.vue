<script setup lang="ts">
defineProps<{
  href: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}>();
const route = useRoute();
const search = ref(route.query.q?.toString() || undefined);

const handleSearch = useDebounceFn((e: string | number) => {
  search.value = e.toString() || undefined;

  useRouter().push({
    query: { ...route.query, q: search.value },
  });
}, 1000);
</script>

<template>
  <div
    :class="`bg-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`"
  >
    <!-- <NuxtImg
      v-if="iconPosition === 'left'"
      :src="imgSrc"
      alt="Search icon"
      width="24"
      height="24"
      class="cursor-pointer"
    /> -->
    <Icon
      name="fluent:search-20-filled"
      class="text-dark400_light800 size-7 cursor-pointer"
    />

    <Input
      type="text"
      :placeholder="placeholder"
      class="paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
      :model-value="search"
      @update:model-value="handleSearch"
    />

    <NuxtImg
      v-if="iconPosition === 'right'"
      :src="imgSrc"
      alt="Search icon"
      width="24"
      height="24"
      class="cursor-pointer"
    />
  </div>
</template>
