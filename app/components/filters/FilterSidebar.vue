<script setup lang="ts"></script>

<template>
  <div class="sticky top-0 z-30 space-y-6 rounded-xl border bg-white p-4">
    <div class="flex items-center justify-between">
      <h3 class="font-semibold">BỘ LỌC TÌM KIẾM</h3>
      <button class="text-sm text-red-500">Bỏ lọc</button>
    </div>

    <TimeFilter />
    <VehicleFilter />
    <SeatFilter />
    <FloorFilter />
  </div>
</template>
