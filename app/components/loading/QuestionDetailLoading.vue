<template>
  <div>
    <div class="flex-start w-full flex-col">
      <!-- Header Skeleton -->
      <div
        class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center sm:gap-2"
      >
        <div class="flex items-center justify-start gap-2">
          <!-- Avatar Skeleton -->
          <Skeleton class="h-6 w-6 rounded-full" />

          <!-- Name Skeleton -->
          <Skeleton class="h-4 w-24" />
        </div>

        <!-- Votes Skeleton -->
        <Skeleton class="h-8 w-32" />
      </div>

      <!-- Title Skeleton -->
      <Skeleton class="mt-3.5 h-6 w-full" />
    </div>

    <!-- Metrics Skeleton -->
    <div class="mb-8 mt-5 flex flex-wrap gap-4">
      <Skeleton class="h-5 w-20" />
      <Skeleton class="h-5 w-20" />
      <Skeleton class="h-5 w-20" />
    </div>

    <!-- Content Skeleton -->
    <Skeleton class="h-40 w-full" />

    <!-- Tags Skeleton -->
    <div class="mt-8 flex flex-wrap gap-2">
      <Skeleton v-for="i in 3" :key="i" class="h-6 w-12" />
    </div>

    <!-- Answer Form Skeleton -->
    <div class="mt-20">
      <Skeleton class="h-10 w-full" />
    </div>

    <!-- Divider Skeleton -->
    <Skeleton class="my-8 h-0.5 w-full" />

    <!-- Answers Section Skeleton -->
    <div class="mt-8">
      <Skeleton class="h-24 w-full" />
      <Skeleton class="mt-4 h-24 w-full" />
    </div>
  </div>
</template>
