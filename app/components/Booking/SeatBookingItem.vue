<script setup lang="ts">
defineProps<{
  seat: any;
  selectedSeats: string[];
}>();

defineEmits(["toggle"]);
</script>

<template>
  <button
    class="h-10 rounded-md border text-xs font-medium"
    :class="{
      'cursor-not-allowed bg-gray-300 text-gray-500': seat.status === 'sold',
      'border-green-400 bg-green-100 text-green-600': selectedSeats.includes(
        seat.code,
      ),
      'border-blue-400 bg-blue-100 text-blue-700':
        seat.status === 'empty' && !selectedSeats.includes(seat.code),
    }"
    @click="$emit('toggle', seat)"
  >
    {{ seat.code }}
  </button>
</template>
