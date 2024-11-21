<script setup lang="ts">
defineProps<{
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  textStyles?: string;
  href?: string;
  isAuthor?: boolean;
}>();
</script>

<template>
  <NuxtLink
    class="flex-center gap-1"
    :class="{ 'flex-wrap': !isAuthor }"
    :to="href"
  >
    <NuxtImg
      :src="imgUrl"
      width="16"
      height="16"
      :alt="alt"
      class="object-contain"
      :class="{ 'rounded-full': isAuthor }"
    />

    <p :class="`${textStyles} flex items-center gap-1`">
      <span>{{ value }}</span>
      <span
        :class="{ 'max-sm:hidden': isAuthor }"
        class="small-regular line-clamp-1"
        >{{ title }}</span
      >
    </p>
  </NuxtLink>
</template>
