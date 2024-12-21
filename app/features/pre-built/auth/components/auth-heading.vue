<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
  class?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <div :class="props.class">
    <h2 class="text-2xl font-bold">{{ title }}</h2>
    <p
      v-if="description"
      class="mt-2 text-sm font-normal text-gray-950 dark:text-white"
    >
      {{ description }}
    </p>
  </div>
</template>
