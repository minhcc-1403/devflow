<script setup lang="ts">
defineProps<{
  href?: string;
  imgUrl: string;
  title: string;
}>();
</script>

<template>
  <div class="flex-center gap-1">
    <NuxtImg :src="imgUrl" width="20" height="20" alt="icon" />

    <NuxtLink
      v-if="href"
      :to="href"
      target="_blank"
      class="paragraph-medium text-accent-blue"
      >{{ title }}</NuxtLink
    >

    <p v-else class="paragraph-medium text-dark400_light700">
      {{ title }}
    </p>
  </div>
</template>
