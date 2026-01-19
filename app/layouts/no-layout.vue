<script setup lang="ts">
useHead({
  title: "Futabus",
  meta: [
    {
      name: "Futabus",
      content: "A community for developers, ask questions and get answers.",
    },
  ],
});
const { isMenuOpen } = useOpenMenu();
const navRef = ref();
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <header
      class="relative z-30 h-56 bg-gradient-to-b from-green-300 via-green-400 to-green-500"
      :class="{ 'z-[999]': isMenuOpen }"
    >
      <TopBar @open-menu="navRef?.openMobileMenu()" />

      <MainNav ref="navRef" />
    </header>

    <main class="relative mx-auto max-w-7xl px-4 sm:px-6">
      <slot />
    </main>

    <Footer />
  </div>
</template>
