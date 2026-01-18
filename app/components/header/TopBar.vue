<script setup lang="ts">
const emit = defineEmits(["open-menu"]);
</script>

<template>
  <div
    class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
  >
    <!-- LEFT: Hamburger + Flag -->
    <div class="flex items-center gap-3">
      <!-- Hamburger (mobile) -->
      <button
        class="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 md:hidden"
        @click="emit('open-menu')"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      <!-- Language -->
      <button
        class="hidden items-center gap-1 text-sm text-white hover:opacity-80 sm:flex"
      >
        <img
          src="https://futabus.vn/images/icons/vietnam.svg"
          alt="Vietnam"
          class="h-4 w-4"
        >
        <span>VI</span>
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>

    <!-- CENTER LOGO -->
    <div class="flex flex-1 justify-center">
      <img
        src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg"
        alt="FUTA Bus Lines"
        class="h-8 object-contain sm:h-10"
      >
    </div>

    <!-- RIGHT: Auth -->
    <div class="flex items-center">
      <button
        class="flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow hover:bg-gray-100 sm:px-4 sm:text-sm"
      >
        <svg
          class="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5.121 17.804A9 9 0 1118.9 4.1M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span class="hidden sm:inline">Đăng nhập / Đăng ký</span>
      </button>
    </div>
  </div>
</template>
