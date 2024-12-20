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
  views: number;
  createdAt: Date;
  userId: string;
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

      <EditDeleteAction type="Answer" :item-id="_id" />
    </div>

    <div class="flex-between mt-6 w-full flex-wrap gap-3">
      <Metric
        img-url="https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybUE3bW9hZzBTQlhmZXpkVm5HNGp5Z1BFN1EiLCJyaWQiOiJ1c2VyXzJtQmJaQkxTNks5c1h4VkhuMEhHUHVOVXpMMyIsImluaXRpYWxzIjoiTUcifQ&w=16&q=75"
        alt="user"
        :value="author.fullName"
        title="- answered 1 hour ago"
        text-styles="body-medium text-dark400_light700"
        is-author
        :href="`/profile/${author._id}`"
      />

      <Metric
        img-url="https://devflow-rose.vercel.app/assets/icons/like.svg"
        alt="Upvotes"
        :value="formatAndDivideNumber(upvotes)"
        title="Votes"
        text-styles="small-medium text-dark400_light800"
      />
    </div>
  </div>
</template>
