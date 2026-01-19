<script setup lang="ts">
import type { Trip } from "~/validations/trip.validation";

defineProps<{
  trip: Trip | null;
}>();
</script>

<template>
  <div v-if="trip" class="overflow-hidden rounded-xl border bg-white">
    <div class="border-b p-4">
      <h3 class="font-semibold">CHUYẾN ĐI CỦA BẠN</h3>
    </div>

    <div class="flex gap-3 p-4">
      <!-- Index -->
      <div
        class="flex h-8 w-8 items-center justify-center rounded bg-green-500 font-bold text-white"
      >
        1
      </div>

      <!-- Info -->
      <div class="flex-1 space-y-2 text-sm">
        <div class="font-medium">
          {{ trip.date }}
        </div>

        <div class="text-muted-foreground">
          {{ trip.route }}
        </div>

        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold">{{ trip.departTime }}</p>
            <p class="text-muted-foreground">
              {{ trip.departStation }}
            </p>
          </div>

          <div class="text-center text-xs text-muted-foreground">
            {{ trip.duration }}
          </div>

          <div>
            <p class="font-semibold">{{ trip.arriveTime }}</p>
            <p class="text-muted-foreground">
              {{ trip.arriveStation }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Empty -->
  <div
    v-else
    class="rounded-xl border bg-white p-4 text-sm text-muted-foreground"
  >
    Chưa chọn chuyến nào
  </div>
</template>
