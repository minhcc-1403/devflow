<script setup lang="ts">
defineProps<{
  code: string;
  status: "available" | "sold" | "selected";
}>();

const emit = defineEmits<{
  (e: "toggle"): void;
}>();
</script>

<template>
  <button
    :disabled="status === 'sold'"
    class="relative flex h-10 w-10 items-center justify-center rounded border text-xs font-medium transition"
    :class="{
      'cursor-not-allowed bg-gray-200 text-gray-400': status === 'sold',
      'border-blue-400 bg-blue-50 text-blue-600': status === 'available',
      'border-green-500 bg-green-100 text-green-600': status === 'selected',
    }"
    @click="emit('toggle')"
  >
    {{ code }}
  </button>
</template>
