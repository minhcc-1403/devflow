<script setup lang="ts">
import "~/assets/css/global.css";
import "~/assets/css/prism.css";
import SheetProvider from "~/providers/SheetProvider.vue";
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster />
  <SheetProvider />
</template>
