<script setup lang="ts">
import "~/assets/css/global.css";
import "~/assets/css/prism.css";
import SheetProvider from "~/providers/SheetProvider.vue";

const authStore = useAuthStore();

onMounted(() => {
  if (storeToRefs(authStore).authUser.value) {
    authStore.fetchMyQuestionActivity();
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <Toaster />
  <SheetProvider />
</template>
