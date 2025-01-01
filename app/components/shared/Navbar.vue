<template>
  <nav
    class="bg-light900_dark200 shadow-light-300 fixed z-50 flex w-full justify-between gap-5 p-6 dark:shadow-none sm:px-12"
  >
    <!-- Logo -->
    <NuxtLink to="/" class="flex items-center gap-1">
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

    <!-- Global Search -->
    <GlobalSearch />

    <div class="flex items-center justify-between gap-5">
      <Theme />

      <div class="max-sm:hidden">
        <UserMenu />
      </div>

      <div class="sm:hidden">
        <MobileNav />
      </div>
    </div>
  </nav>
</template>
