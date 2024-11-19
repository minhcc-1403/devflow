<script setup lang="ts">
import { sidebarLinks } from "~/utils/constants";
const route = useRoute();
</script>

<template>
  <section
    class="bg-light900_dark200 light-border borer-r shadow-light-300 custom-scrollbar fixed left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-36 dark:shadow-none max-sm:hidden lg:w-[266px]"
  >
    <!-- Content -->
    <div class="flex flex-1 flex-col gap-6">
      <NuxtLink
        v-for="item in sidebarLinks"
        :key="item.href"
        :to="item.href"
        class="flex items-center justify-start gap-4 bg-transparent p-4"
        :class="{
          'primary-gradient rounded-lg font-medium text-gray-100':
            item.href === route.path,
          'text-dark300_light900 font-normal': item.href !== route.path,
        }"
      >
        <Icon :name="item.icon" class="size-5" />
        <p class="max-lg:hidden">{{ item.label }}</p>
      </NuxtLink>
    </div>

    <div class="flex flex-col gap-3">
      <NuxtLink to="/sign-in">
        <Button
          class="small-medium btn-secondary text-dark400_light800 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
        >
          <Icon name="hugeicons:user-circle" class="size-5 lg:hidden" />
          <span class="primary-text-gradient max-lg:hidden">Log In</span>
        </Button>
      </NuxtLink>

      <NuxtLink to="/sign-up">
        <Button
          class="small-medium light-border-2 text-dark400_light800 min-h-[41px] w-full rounded-lg bg-secondary px-4 py-3 shadow-none"
        >
          <Icon name="iconoir:user-plus" class="size-5 lg:hidden" />

          <span class="max-lg:hidden">Sign Up</span>
        </Button>
      </NuxtLink>
    </div>
  </section>
</template>
