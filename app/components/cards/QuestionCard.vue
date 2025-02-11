<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import type { Tag } from "~/types/2-tag.type";
import type { User } from "~/types/pre-built/2-user";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

defineProps<{
  _id: string;
  title: string;
  tags: Tag[];
  author: User;
  upvotes: number;
  answerCount: number;
  views: number;
  createdAt: Date;
  userId?: string;
}>();
</script>

<template>
  <div class="card-wrapper rounded-[10px] p-9 shadow-md sm:px-11">
    <div class="flex flex-col items-start justify-between sm:flex-row">
      <span
        class="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden"
        >{{ formatDistanceToNowStrict(createdAt, { addSuffix: true }) }}</span
      >

      <NuxtLink :to="`/question/${_id}`">
        <h3
          class="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1"
        >
          {{ title }}
        </h3>
      </NuxtLink>

      <EditDeleteAction
        v-if="userId === author._id"
        type="Question"
        :item-id="_id"
        :user-id="userId"
      />
    </div>

    <div class="mt-3.5 flex flex-wrap gap-2">
      <RenderTag
        v-for="tag in tags"
        :key="tag._id"
        :_id="tag._id"
        :name="tag.name"
      />
    </div>

    <div class="flex-between mt-6 w-full flex-wrap gap-3">
      <Metric
        :img-url="author.avatar || `/images/avatar.webp`"
        alt="user"
        :value="author.fullName"
        title="- asked 1 hour ago"
        text-styles="body-medium text-dark400_light700"
        is-author
        :href="`/profile/${author._id}`"
      />

      <div
        class="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start"
      >
        <Metric
          icon="ant-design:like-outlined"
          alt="Upvotes"
          :value="formatAndDivideNumber(upvotes)"
          title="Votes"
          text-styles="small-medium text-dark400_light800"
        />

        <Metric
          icon="mage:message-round"
          alt="message"
          :value="formatAndDivideNumber(answerCount)"
          title="Answers"
          text-styles="small-medium text-dark400_light800"
        />

        <Metric
          icon="famicons:eye-outline"
          alt="eye"
          :value="formatAndDivideNumber(views)"
          title="Views"
          text-styles="small-medium text-dark400_light800"
        />
      </div>
    </div>
  </div>
</template>
