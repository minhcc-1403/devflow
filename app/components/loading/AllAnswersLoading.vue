<template>
  <div>
    <!-- Header Skeleton -->
    <div class="flex items-center justify-between">
      <Skeleton class="h-6 w-32" />
      <Skeleton class="h-6 w-20" />
    </div>

    <div v-for="i in 3" :key="i">
      <article class="light-border border-b py-10">
        <!-- Author Section Skeleton -->
        <div class="flex items-center justify-between">
          <div
            class="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
          >
            <div
              class="flex flex-1 items-start justify-start gap-2 sm:items-center"
            >
              <!-- Avatar Skeleton -->
              <Skeleton class="h-5 w-5 rounded-full" />

              <div class="flex flex-col sm:flex-row sm:items-center">
                <!-- Name Skeleton -->
                <Skeleton class="h-4 w-24" />
                <!-- Timestamp Skeleton -->
                <Skeleton class="mt-1 h-4 w-32" />
              </div>
            </div>

            <!-- Votes Skeleton -->
            <div class="flex justify-end">
              <Skeleton class="h-8 w-16" />
            </div>
          </div>
        </div>

        <!-- Content Skeleton -->
        <Skeleton class="h-20 w-full" />
      </article>
    </div>
  </div>
</template>
