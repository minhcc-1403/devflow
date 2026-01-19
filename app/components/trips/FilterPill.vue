<script setup lang="ts">
defineProps<{
  label: string;
  icon: string;
}>();
</script>

<template>
  <Button
    size="sm"
    variant="outline"
    class="rounded-full border-green-500 text-green-500 hover:bg-green-50"
  >
    <span class="mr-1 flex h-4 w-4 items-center justify-center">
      {{ icon }}
    </span>
    {{ label }}
  </Button>
</template>
