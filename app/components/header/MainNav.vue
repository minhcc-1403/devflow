<script setup lang="ts">
import { useOpenMenu } from "~/composables/useOpenMenu";
const route = useRoute();
const { isMenuOpen, setIsMenuOpen } = useOpenMenu();

const menus = [
  { key: "home", label: "Trang chủ", to: "/futabus" },
  { key: "schedule", label: "Lịch trình", to: "/futabus/routes" },
  { key: "ticket", label: "Tra cứu vé", to: "/futabus/ticket-lookup" },
  { key: "contact", label: "Liên hệ", to: "/futabus/contact-us" },
  { key: "about", label: "Về chúng tôi", to: "/futabus/about-us" },
  { key: "news", label: "Tin tức", to: "/futabus/#", disable: true },
  { key: "invoice", label: "Hóa đơn", to: "/futabus/#", disable: true },
];

// expose function for TopBar
const openMobileMenu = () => {
  setIsMenuOpen(true);
};

defineExpose({ openMobileMenu });
</script>
<template>
  <div>
    <!-- DESKTOP NAV -->
    <nav class="hidden md:block">
      <ul
        class="mx-auto flex h-14 max-w-7xl items-center justify-center gap-10 text-sm font-semibold uppercase text-white"
      >
        <li
          v-for="item in menus"
          :key="item.key"
          class="relative cursor-pointer pb-2 transition-opacity hover:opacity-80"
          :class="{ 'opacity-50': item.disable }"
          @click="item.disable && $event.preventDefault()"
        >
          <NuxtLink
            :to="item.to"
            :class="{ 'cursor-not-allowed': item.disable }"
          >
            <span>{{ item.label }}</span>

            <!-- underline active -->
            <span
              v-if="route.path === item.to"
              class="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-white"
            />
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <!-- MOBILE DRAWER -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="fixed inset-0 z-50 bg-black/40"
        @click="setIsMenuOpen(false)"
      />
    </transition>

    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="isMenuOpen"
        class="fixed left-0 top-0 z-50 h-full w-[85%] max-w-sm bg-white shadow-xl"
      >
        <div class="flex items-center justify-between border-b px-4 py-4">
          <span class="text-sm font-semibold text-green-500"
            >Đăng nhập / Đăng ký</span
          >
          <button
            class="rounded-md p-2 text-gray-500 hover:bg-gray-100"
            @click="setIsMenuOpen(false)"
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

        <nav class="flex flex-col divide-y text-sm">
          <NuxtLink
            v-for="item in menus"
            :key="item.key"
            :to="item.to"
            class="px-4 py-3 hover:bg-green-50"
            :class="{ 'pointer-events-none opacity-50': item.disable }"
            @click="setIsMenuOpen(false)"
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>
    </transition>
  </div>
</template>
