<script setup lang="ts">
import type { Locale } from "~/types/locale";
import { languages } from "~/utils/constants";

const localeSelected = ref<Locale>(languages[0]!);

const onLocaleSelect = (language: Locale) => {
  localeSelected.value = language;
};
</script>

<template>
  <div
    class="bg-light900_dark200 h-screen w-screen overflow-y-auto text-foreground"
  >
    <div class="flex h-full w-full flex-col space-y-8 lg:flex-row lg:space-y-0">
      <!-- Logo -->
      <div
        class="logo relative left-0 right-0 top-0 px-6 py-4 pt-5 lg:bottom-0 lg:w-1/2"
      >
        <!-- Logo -->
        <NuxtLink to="/" class="relative z-10 flex items-center gap-1">
          <NuxtImg
            src="/images/site-logo.svg"
            width="23"
            height="23"
            alt="DevFlow"
          />
          <p
            class="h2-bold font-spaceGrotesk text-[#000000] dark:text-[#FFFFFF] max-sm:hidden"
          >
            Dev <span class="text-main-500">Overflow</span>
          </p>
        </NuxtLink>

        <div
          class="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:items-center lg:justify-center"
        >
          <img
            src="https://modernize-nuxt.adminmart.com/images/backgrounds/login-bg.svg"
            alt="Login Background"
          >
        </div>
      </div>

      <!-- Form -->
      <div class="lg:flex lg:w-1/2 lg:items-center lg:justify-center">
        <div class="flex flex-col justify-center px-6 lg:h-1/2">
          <div class="lg:flex-1">
            <slot />
          </div>

          <!-- Footer -->
          <div class="my-8 flex items-center justify-between lg:mt-12">
            <!-- language -->
            <LocaleSelect
              :locales="languages"
              :locale-selected="localeSelected"
              @on-select="onLocaleSelect"
            />

            <!-- links -->
            <div class="flex items-center justify-end gap-x-3 md:gap-x-6">
              <NuxtLink
                to="/"
                target="_blank"
                class="primary-text-gradient text-[13px] font-medium transition-all hover:underline hover:opacity-90 lg:text-sm"
                >Terms</NuxtLink
              >
              <NuxtLink
                to="/"
                target="_blank"
                class="primary-text-gradient text-[13px] font-medium transition-all hover:underline hover:opacity-90 lg:text-sm"
                >Plans</NuxtLink
              >
              <NuxtLink
                to="/"
                target="_blank"
                class="primary-text-gradient text-[13px] font-medium transition-all hover:underline hover:opacity-90 lg:text-sm"
                >Contact Us</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo::before {
  background: radial-gradient(#d2f1df, #d3d7fa, #bad8f4) 0 0 / 400% 400%;
  bottom: 0;
  content: "";
  height: 100%;
  opacity: 0.3;
  width: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
</style>
