<template>
  <div class="flex w-full items-center rounded-full border bg-white px-4 py-2">
    <span class="mr-2 text-gray-400">🔍</span>
    <input
      :placeholder="placeholder"
      class="w-full border-none text-sm outline-none"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  placeholder: string;
}>();
</script>
