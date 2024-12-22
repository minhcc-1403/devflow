<script setup lang="ts">
import type { UserBadgeCounts } from "~/types/0-general.type";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

defineProps<{
  questionsCount?: number;
  answersCount?: number;
  userBadgeCounts?: UserBadgeCounts;
}>();
</script>

<template>
  <div class="mt-10">
    <h2 class="h3-semibold text-dark200_light900">Stats</h2>

    <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
      <div
        class="light-border bg-light900_dark300 shadow-light-300 flex flex-wrap items-center gap-x-4 rounded-md border p-6 dark:shadow-dark-200"
      >
        <div>
          <p class="paragraph-semibold text-dark200_light900">
            {{ formatAndDivideNumber(questionsCount || 0) }}
          </p>
          <p class="body-medium text-dark400_light700">Questions</p>
        </div>

        <div>
          <p class="paragraph-semibold text-dark200_light900">
            {{ formatAndDivideNumber(answersCount || 0) }}
          </p>
          <p class="body-medium text-dark400_light700">Answers</p>
        </div>
      </div>

      <StatsCard
        img-url="https://devflow-rose.vercel.app/assets/icons/gold-medal.svg"
        :value="userBadgeCounts?.badgeCounts.gold || 0"
        title="Gold Badges"
      />

      <StatsCard
        img-url="https://devflow-rose.vercel.app/assets/icons/silver-medal.svg"
        :value="userBadgeCounts?.badgeCounts.silver || 0"
        title="Silver Badges"
      />

      <StatsCard
        img-url="https://devflow-rose.vercel.app/assets/icons/bronze-medal.svg"
        :value="userBadgeCounts?.badgeCounts.bronze || 0"
        title="Bronze Badges"
      />
    </div>
  </div>
</template>
