<script setup lang="ts">
defineProps<{
  imgUrl?: string;
  icon?: string;
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
      v-if="imgUrl"
      :src="imgUrl"
      width="16"
      height="16"
      :alt="alt"
      class="object-contain"
      :class="{ 'rounded-full': isAuthor }"
    />

    <Icon v-if="icon" :name="icon" class="size-3" />

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
