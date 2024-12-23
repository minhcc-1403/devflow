<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

useHead({
  title: "DevFlow",
  meta: [
    {
      name: "DevFlow",
      content: "A community for developers, ask questions and get answers.",
    },
  ],
});

const isMobile = useMediaQuery("(max-width: 1024px)");
</script>

<template>
  <main class="bg-light850_dark100 relative">
    <Navbar />

    <div class="relative flex">
      <LeftSidebar v-if="!isMobile" />

      <section
        class="bg-light900_dark200 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14"
      >
        <div class="mx-auto w-full max-w-5xl">
          <slot />
        </div>
      </section>

      <RightSidebar v-if="!isMobile" />
    </div>
  </main>
</template>
