<script setup lang="ts">
const isMounted = ref(false);

onMounted(() => (isMounted.value = true));
</script>

<template>
  <template v-if="isMounted">
    <ConfirmDialog />
  </template>
</template>
