<script setup lang="ts">
import { ref } from "vue";

const mobileMenuOpen = ref(false);

const menuItems = [
  "Trang chủ",
  "Lịch trình",
  "Tra cứu vé",
  "Tin tức",
  "Hóa đơn",
  "Liên hệ",
  "Về chúng tôi",
  "Tuyển dụng",
  "Mạng lưới văn phòng",
  "Điều khoản sử dụng",
  "Câu hỏi thường gặp",
  "Hướng dẫn đặt vé trên Web",
  "Hướng dẫn nạp tiền trên App",
];
</script>

<template>
  <header
    class="relative bg-gradient-to-b from-green-300 via-green-400 to-green-500"
  >
    <!-- TOP BAR -->
    <div
      class="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6"
    >
      <!-- LEFT: Hamburger + Flag -->
      <div class="flex items-center gap-3">
        <!-- Hamburger -->
        <button
          class="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none"
          @click="mobileMenuOpen = true"
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

        <!-- Flag -->
        <img
          src="https://futabus.vn/images/icons/vietnam.svg"
          alt="Vietnam"
          class="h-5 w-5"
        />
      </div>

      <!-- CENTER LOGO -->
      <div class="flex flex-1 justify-center">
        <img
          src="https://futabus.vn/_next/static/media/logo_new.8a0251b8.svg"
          alt="FUTA Bus Lines"
          class="h-8 object-contain sm:h-10"
        />
      </div>

      <!-- RIGHT: User Icon -->
      <div class="flex items-center">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-orange-500 shadow hover:bg-white"
        >
          <svg
            class="h-5 w-5"
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
        </button>
      </div>
    </div>

    <!-- OVERLAY -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/40"
        @click="mobileMenuOpen = false"
      />
    </transition>

    <!-- SIDE DRAWER MENU -->
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="mobileMenuOpen"
        class="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-xl"
      >
        <!-- HEADER -->
        <div class="flex items-center justify-between border-b px-4 py-4">
          <span class="text-sm font-semibold text-orange-500"
            >Đăng nhập / Đăng ký</span
          >
          <button
            class="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            @click="mobileMenuOpen = false"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- MENU ITEMS -->
        <nav class="flex flex-col divide-y text-sm">
          <button
            v-for="item in menuItems"
            :key="item"
            class="px-4 py-3 text-left hover:bg-orange-50"
          >
            {{ item }}
          </button>
        </nav>
      </aside>
    </transition>
  </header>
</template>

<style scoped>
header {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
