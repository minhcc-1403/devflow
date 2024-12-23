<template>
  <div>
    <div class="flex w-full flex-row items-center justify-between">
      <div class="flex flex-1 flex-col items-start gap-4 lg:flex-row">
        <Skeleton class="h-[140px] w-[140px] rounded-full" />

        <div class="mt-3 w-full lg:flex-1">
          <Skeleton class="h-6 w-1/2" />
          <Skeleton class="mt-2 h-4 w-1/4" />

          <div class="mt-5 flex flex-wrap items-center justify-start gap-5">
            <Skeleton class="h-7 w-1/5" />
            <Skeleton class="h-7 w-1/5" />
            <Skeleton class="h-7 w-1/5" />
          </div>

          <p class="paragraph-regular text-dark400_light800 mt-5">
            <Skeleton class="h-12 w-3/4" />
          </p>
        </div>
      </div>

      <div class="flex justify-end">
        <Skeleton class="h-12 w-[175px]" />
      </div>
    </div>
  </div>
</template>
