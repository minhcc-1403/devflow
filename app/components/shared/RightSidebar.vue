<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import { tagApi } from "~/apis/devflow/2-tag.api";
import type { Question } from "~/types/1-question.type";
import type { Tag } from "~/types/2-tag.type";

const hotQuestions = useState<Question[]>("hot-question", () => []);
const popularTags = useState<Tag[]>("popular-tags", () => []);

callOnce("hot-question", async () => {
  hotQuestions.value = await questionApi.getAll({
    _limit: 5,
    _sort: "-views,-upvoteCount",
  });
});

callOnce("popular-tags", async () => {
  popularTags.value = await tagApi.getAll({
    _limit: 5,
    _sort: "-questionCount,-followerCount",
  });
});
</script>

<template>
  <section
    class="custom-scrollbar bg-light900_dark200 light-border shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-28 dark:shadow-none max-xl:hidden md:pt-36"
  >
    <div>
      <h3 class="h3-bold text-dark200_light900">Top Questions</h3>

      <div class="mt-7 flex w-full flex-col gap-8">
        <NuxtLink
          v-for="question in hotQuestions"
          :key="question._id"
          class="flex cursor-pointer items-center justify-between gap-7"
          :to="`/question/${question._id}`"
        >
          <p class="body-medium text-dark500_light700">
            {{ question.title }}
          </p>

          <!-- <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            :height="20"
            :width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          /> -->
          <Icon name="tdesign:chevron-right" class="size-5" />
        </NuxtLink>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="h3-bold text-dark200_light900">Popular Tags</h3>
      <div class="mt-7 flex flex-col gap-4">
        <RenderTag
          v-for="tag in popularTags"
          :key="tag._id"
          :_id="tag._id"
          :name="tag.name"
          :show-count="true"
          :total-questions="tag.questionCount"
        />
      </div>
    </div>
  </section>
</template>
