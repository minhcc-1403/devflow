<script setup lang="ts">
import type { Trip } from "~/validations/trip.validation";

defineProps<{
  trips: Trip[];
  routeName: string;
}>();

// const emit = defineEmits<{
//   (e: "select", trip: Trip): void;
// }>();
</script>

<template>
  <div class="space-y-4">
    <TripListHeader :route="routeName" :total="trips.length" />

    <!-- eslint-disable @typescript-eslint/no-unused-vars -->
    <TripCard v-for="trip in trips" :key="trip.id" />
  </div>
</template>
