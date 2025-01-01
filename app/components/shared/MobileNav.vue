<script setup lang="ts">
import { sidebarLinks } from "~/utils/constants";

const route = useRoute();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Icon
        name="icon-park-outline:hamburger-button"
        class="size-8 cursor-pointer dark:text-gray-100"
      />
    </SheetTrigger>

    <SheetContent class="bg-light900_dark200 border-none" side="left">
      <SheetHeader>
        <SheetTitle as-child>
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-1">
            <NuxtImg
              src="/images/site-logo.svg"
              width="23"
              height="23"
              alt="DevFlow"
            />
            <p class="h2-bold text-dark100_light800 font-spaceGrotesk">
              Dev <span class="text-main-500">Overflow</span>
            </p>
          </NuxtLink>
        </SheetTitle>
        <SheetDescription />
      </SheetHeader>

      <!-- Content -->
      <section class="flex flex-1 flex-col gap-6 pt-16">
        <SheetClose
          v-for="item in sidebarLinks.filter((link) => {
            if (link.href === '/profile') {
              if (!user) return false;

              link.href = `/profile/${user._id}`;
              return true;
            }

            return true;
          })"
          :key="item.href"
          as-child
        >
          <NuxtLink
            :to="item.href"
            class="flex items-center justify-start gap-4 bg-transparent p-4"
            :class="{
              'primary-gradient rounded-lg font-medium text-gray-100':
                item.href === route.path,
              'text-dark300_light900 font-normal': item.href !== route.path,
            }"
          >
            <Icon :name="item.icon" class="size-5" />
            <p>{{ item.label }}</p>
          </NuxtLink>
        </SheetClose>
      </section>

      <!-- Footer -->
      <SheetClose as-child>
        <div class="flex flex-col gap-3 pt-16">
          <NuxtLink to="/sign-in">
            <Button
              class="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
            >
              <span class="primary-text-gradient">Log In</span>
            </Button>
          </NuxtLink>

          <NuxtLink to="/sign-up">
            <Button
              class="small-medium light-border-2 btn-tertiary text-dark400_light800 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none"
              >Sign Up</Button
            >
          </NuxtLink>
        </div>
      </SheetClose>
    </SheetContent>
  </Sheet>
</template>
