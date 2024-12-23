<template>
  <div class="mt-10">
    <Skeleton class="h-6 w-1/6" />

    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      <Skeleton
        v-for="i in 4"
        :key="`stats_loading_${i}`"
        class="h-32 w-full"
      />
    </div>
  </div>
</template>
