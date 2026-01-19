<script setup lang="ts">
import { MapPin } from "lucide-vue-next";
import type { TimelineStop } from "~/validations/trip.validation";

defineProps<{
  stop: TimelineStop;
}>();
</script>

<template>
  <div class="flex gap-4">
    <!-- Time -->
    <div class="w-12 text-sm font-medium">
      {{ stop.time }}
    </div>

    <!-- Dot + line -->
    <div class="relative flex flex-col items-center">
      <span
        class="h-3 w-3 rounded-full"
        :class="{
          'bg-green-600': stop.type === 'start',
          'bg-gray-400': stop.type === 'stop',
          'bg-green-500': stop.type === 'end',
        }"
      />
      <span class="mt-1 w-px flex-1 bg-gray-300" />
    </div>

    <!-- Content -->
    <div class="flex-1 pb-6">
      <div class="flex items-center gap-1 font-medium">
        <MapPin v-if="stop.type === 'end'" class="h-4 w-4 text-green-500" />
        {{ stop.title }}
      </div>
      <div class="text-sm text-muted-foreground">
        {{ stop.address }}
      </div>
    </div>
  </div>
</template>
