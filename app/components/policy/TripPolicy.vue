<script setup lang="ts">
defineProps<{
  html?: string;
}>();
</script>

<template>
  <div
    class="pt-4 text-sm leading-relaxed [&_h3]:mb-2 [&_h3]:font-semibold [&_li]:mb-1 [&_p]:mb-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
  >
    <!-- eslint-disable vue/no-v-html -->
    <div v-if="html" v-html="html" />
    <p v-else class="italic text-muted-foreground">
      Chưa có thông tin chính sách
    </p>
  </div>
</template>
