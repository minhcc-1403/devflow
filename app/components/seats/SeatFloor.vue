<script setup lang="ts">
defineProps<{
  title: string;
  seats: {
    code: string;
    status: "available" | "sold" | "selected";
  }[];
}>();

const emit = defineEmits(["toggle"]);
</script>

<template>
  <div class="space-y-3">
    <h4 class="text-center text-sm font-medium">
      {{ title }}
    </h4>

    <div class="grid grid-cols-4 justify-items-center gap-3">
      <SeatItem
        v-for="seat in seats"
        :key="seat.code"
        :code="seat.code"
        :status="seat.status"
        @toggle="emit('toggle', seat.code)"
      />
    </div>
  </div>
</template>
