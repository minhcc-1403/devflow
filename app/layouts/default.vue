<script setup lang="ts">
useHead({
  title: "DevFlow",
  meta: [
    {
      name: "DevFlow",
      content: "A community for developers, ask questions and get answers.",
    },
  ],
});
</script>

<template>
  <div>
    <Header />

    <main class="px-3 lg:px-14">
      <slot />
    </main>
  </div>
</template>
