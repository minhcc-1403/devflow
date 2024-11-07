<script setup lang="ts">
import type { Locale } from "~/types/locale";
import { languages } from "~/utils/constants";

const localeSelected = ref<Locale>(languages[0]!);

const onLocaleSelect = (language: Locale) => {
  localeSelected.value = language;
};
</script>

<template>
  <div class="page">
    <div class="page__content">
      <!-- Logo -->
      <div class="logo">
        <NuxtLink to="/" class="logo__link">
          <img src="/logo.svg" alt="Logo" />
        </NuxtLink>

        <div class="logo__bg">
          <img
            src="https://modernize-nuxt.adminmart.com/images/backgrounds/login-bg.svg"
            alt="Login Background"
          />
        </div>
      </div>

      <!-- Form -->
      <div class="form">
        <div class="form__content">
          <div class="form__slot">
            <slot />
          </div>

          <!-- Footer -->
          <div class="footer">
            <!-- language -->
            <LocaleSelect
              :locales="languages"
              :locale-selected="localeSelected"
              @on-select="onLocaleSelect"
            />

            <!-- links -->
            <div class="footer__links">
              <NuxtLink to="/" target="_blank" class="footer__link"
                >Terms</NuxtLink
              >
              <NuxtLink to="/" target="_blank" class="footer__link"
                >Plans</NuxtLink
              >
              <NuxtLink to="/" target="_blank" class="footer__link"
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
.page {
  @apply h-screen w-screen overflow-y-auto;
}

.page__content {
  @apply flex h-full w-full flex-col space-y-8 lg:flex-row lg:space-y-0;
}

.logo {
  @apply relative left-0 right-0 top-0 px-6 py-4 pt-5 lg:bottom-0 lg:w-1/2;
}

.logo__link {
  @apply relative z-10;
}

.logo__bg {
  @apply hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:z-10 lg:flex lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:items-center lg:justify-center;
}

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

.form {
  @apply lg:flex lg:w-1/2 lg:items-center lg:justify-center;
}

.form__content {
  @apply flex flex-col justify-center px-6 lg:h-1/2;
}

.form__slot {
  @apply lg:flex-1;
}

.footer {
  @apply my-8 flex items-center justify-between lg:mt-12;
}

.footer__links {
  @apply flex items-center justify-end gap-x-3 md:gap-x-6;
}

.footer__link {
  @apply text-[13px] font-medium text-primary transition-all hover:underline hover:opacity-90 lg:text-sm;
}
</style>
