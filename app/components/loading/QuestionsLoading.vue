<template>
  <div
    v-for="i in 8"
    :key="`home_loading_${i}`"
    class="card-wrapper rounded-[10px] p-9 shadow-md sm:px-11"
  >
    <div class="flex flex-col items-start justify-between gap-1 sm:flex-row">
      <Skeleton class="h-2 w-[50px] sm:hidden" />
      <Skeleton class="h-6 w-3/4" />
    </div>

    <div class="mt-3.5 flex flex-wrap gap-2">
      <Skeleton v-for="skeItem in 3" :key="skeItem" class="h-7 w-20" />
    </div>

    <div class="flex-between mt-6 w-full flex-wrap gap-3">
      <Skeleton class="h-4 w-[40px] rounded-sm" />
      <Skeleton class="h-4 w-[40px] rounded-sm" />
      <Skeleton class="h-4 w-[40px] rounded-sm" />
      <Skeleton class="h-4 w-[40px] rounded-sm" />
    </div>
  </div>
</template>
