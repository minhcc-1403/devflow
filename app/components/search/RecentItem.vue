<script setup lang="ts">
defineProps<{
  title: string;
  date: string;
}>();
</script>

<template>
  <div
    class="min-w-[220px] cursor-pointer rounded-xl border p-4 hover:border-green-400"
  >
    <div class="text-sm font-medium">{{ title }}</div>
    <div class="mt-1 text-xs text-gray-500">{{ date }}</div>
  </div>
</template>
