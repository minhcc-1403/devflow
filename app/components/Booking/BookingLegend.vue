<script setup lang="ts">
defineProps<{ color: string; label: string }>();
</script>

<template>
  <span class="flex items-center gap-1">
    <span :class="['h-3 w-3 rounded', color]" />
    {{ label }}
  </span>
</template>
