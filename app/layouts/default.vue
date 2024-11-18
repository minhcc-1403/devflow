<script setup lang="ts">
import Navbar from "~/components/shared/Navbar.vue";

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
  <main class="bg-light850_dark100 relative">
    <Navbar />

    <div class="flex">
      Left Sidebar

      <section
        class="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14"
      >
        <div class="mx-auto w-full max-w-5xl">
          <slot />
        </div>
      </section>

      Right Sidebar
    </div>

    Toaster
  </main>
</template>
