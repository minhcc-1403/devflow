<template>
  <div class="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Skeleton v-for="i in 9" :key="i" class="h-40 w-full" />
  </div>
</template>
