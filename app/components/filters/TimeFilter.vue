<script setup>
import Checkbox from "~/components/ui/checkbox/Checkbox.vue";
</script>

<template>
  <div class="border-b pb-4">
    <h4 class="mb-2 font-medium">Giờ đi</h4>
    <div class="space-y-2 text-sm">
      <label class="flex items-center gap-2">
        <Checkbox /> Sáng sớm 00:00 - 06:00 (0)
      </label>
      <label class="flex items-center gap-2">
        <Checkbox /> Buổi sáng 06:00 - 12:00 (0)
      </label>
      <label class="flex items-center gap-2">
        <Checkbox /> Buổi chiều 12:00 - 18:00 (3)
      </label>
      <label class="flex items-center gap-2">
        <Checkbox /> Buổi tối 18:00 - 24:00 (0)
      </label>
    </div>
  </div>
</template>
