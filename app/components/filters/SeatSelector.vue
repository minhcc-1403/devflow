<script setup lang="ts">
import { reactive } from "vue";

const seats = reactive({
  lower: Array.from({ length: 16 }, (_, i) => ({
    code: `A${String(i + 1).padStart(2, "0")}`,
    status: "available" as any,
  })),
  upper: Array.from({ length: 17 }, (_, i) => ({
    code: `B${String(i + 1).padStart(2, "0")}`,
    status: "available" as any,
  })),
});

function toggleSeat(code: string) {
  const all = [...seats.lower, ...seats.upper];
  const seat = all.find((s) => s.code === code);
  if (!seat || seat.status === "sold") return;

  seat.status = seat.status === "selected" ? "available" : "selected";
}
</script>

<template>
  <div class="space-y-6 pt-4">
    <SeatLegend />

    <div class="grid grid-cols-2 gap-10">
      <SeatFloor title="Tầng dưới" :seats="seats.lower" @toggle="toggleSeat" />
      <SeatFloor title="Tầng trên" :seats="seats.upper" @toggle="toggleSeat" />
    </div>
  </div>
</template>
