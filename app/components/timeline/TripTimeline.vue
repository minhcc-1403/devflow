<script setup lang="ts">
import type { TimelineStop } from "~/validations/trip.validation";

defineProps<{
  stops: TimelineStop[];
}>();
</script>

<template>
  <div class="space-y-2 pt-4">
    <TimelineItem v-for="(stop, index) in stops" :key="index" :stop="stop" />

    <!-- Note -->
    <div class="mt-4 text-sm">
      <p class="font-medium">Lưu ý</p>
      <p class="text-muted-foreground">
        Thời gian các mốc lịch trình là thời gian dự kiến. Lịch trình này có thể
        thay đổi tùy vào tình hình thực tế xuất bến sớm hay trễ.
      </p>
    </div>
  </div>
</template>
