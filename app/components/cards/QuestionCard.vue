<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

defineProps<{
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    fullName: string;
    avatar: string;
  };
  upvotes: number;
  views: number;
  answers: Array<object>;
  createdAt: Date;
}>();
</script>

<template>
  <div class="card-wrapper rounded-[10px] p-9 sm:px-11">
    <div
      class="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row"
    >
      <div>
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
      </div>
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
        imgUrl="https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18ybUE3bW9hZzBTQlhmZXpkVm5HNGp5Z1BFN1EiLCJyaWQiOiJ1c2VyXzJtQmJaQkxTNks5c1h4VkhuMEhHUHVOVXpMMyIsImluaXRpYWxzIjoiTUcifQ&w=16&q=75"
        alt="user"
        :value="author.fullName"
        title="- asked 1 hour ago"
        textStyles="body-medium text-dark400_light700"
        isAuthor
        :href="`/profile/${author._id}`"
      />

      <Metric
        imgUrl="https://devflow-rose.vercel.app/assets/icons/like.svg"
        alt="Upvotes"
        :value="formatAndDivideNumber(upvotes)"
        title="Votes"
        textStyles="small-medium text-dark400_light800"
      />

      <Metric
        imgUrl="https://devflow-rose.vercel.app/assets/icons/message.svg"
        alt="message"
        :value="formatAndDivideNumber(answers.length)"
        title="Answers"
        textStyles="small-medium text-dark400_light800"
      />

      <Metric
        imgUrl="https://devflow-rose.vercel.app/assets/icons/eye.svg"
        alt="eye"
        :value="formatAndDivideNumber(views)"
        title="Views"
        textStyles="small-medium text-dark400_light800"
      />
    </div>
  </div>
</template>
