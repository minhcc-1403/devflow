<script setup lang="ts">
import type { Trip } from "~/validations/trip.validation";

defineProps<{
  trips: Trip[];
  routeName: string;
}>();

const emit = defineEmits(["openFilter", "select", "back"]);
</script>

<template>
  <!-- HEADER -->
  <div class="sticky top-0 z-40 bg-green-500 px-4 py-3 text-white">
    <div class="flex items-center justify-between">
      <button @click="emit('back')">←</button>
      <div class="text-center">
        <p class="font-semibold">{{ routeName }}</p>
        <p class="text-xs opacity-80">Thứ 2, 19/01</p>
      </div>
      <button @click="$emit('openFilter')">
        <img
          src="https://futabus.vn/images/icons/edit_filter.svg"
          alt="filter"
          class="h-6 w-6"
        >
      </button>
    </div>
  </div>
  <!-- QUICK FILTER -->
  <div class="flex justify-evenly gap-2 overflow-x-auto px-4 py-2">
    <FilterPill icon="🔥" label="Giá rẻ bất ngờ" />
    <FilterPill icon="⏰" label="Giờ khởi hành" />
    <FilterPill icon="💺" label="Ghế trống" />
  </div>
  <!-- TRIP LIST -->
  <div class="space-y-2">
    <!-- eslint-disable @typescript-eslint/no-unused-vars -->
    <TripCard v-for="trip in trips" :key="trip.id" />
  </div>
</template>
