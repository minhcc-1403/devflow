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

// const isMobile = useMediaQuery("(max-width: 1024px)");
</script>

<template>
  <main class="bg-light850_dark100 relative">
    <Navbar />

    <div class="relative flex">
      <div class="max-sm:hidden">
        <LeftSidebar />
      </div>

      <section
        class="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14 md:pt-36"
      >
        <div class="mx-auto w-full max-w-5xl">
          <slot />
        </div>
      </section>

      <div class="max-sm:hidden">
        <RightSidebar />
      </div>
    </div>
  </main>
</template>
