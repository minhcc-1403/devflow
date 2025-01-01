<script setup lang="ts">
import { sidebarLinks } from "~/utils/constants";

const route = useRoute();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <section
    class="custom-scrollbar bg-light900_dark200 light-border shadow-light-300 sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r p-6 pt-28 dark:shadow-none max-sm:hidden md:pt-36 lg:w-[266px]"
  >
    <!-- Content -->
    <div class="flex flex-1 flex-col gap-6">
      <NuxtLink
        v-for="item in sidebarLinks.filter((link) => {
          if (link.href === '/profile') {
            if (!user) return false;

            link.href = `/profile/${user._id}`;
            return true;
          }

          return true;
        })"
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

    <Button
      v-if="user"
      class="small-medium btn-secondary text-dark400_light800 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
      @click="authStore.logout()"
    >
      <Icon name="hugeicons:user-circle" class="size-5 lg:hidden" />
      <span class="primary-text-gradient max-lg:hidden">Sign Out</span>
    </Button>

    <div v-else class="flex flex-col gap-3">
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
          class="small-medium light-border-2 text-dark400_light800 min-h-[41px] w-full rounded-lg bg-secondary px-4 py-3 shadow-none hover:bg-secondary/90"
        >
          <Icon name="iconoir:user-plus" class="size-5 lg:hidden" />

          <span class="max-lg:hidden">Sign Up</span>
        </Button>
      </NuxtLink>
    </div>
  </section>
</template>
