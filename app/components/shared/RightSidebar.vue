<script setup lang="ts">
const topQuestions = [
  {
    _id: "1",
    title:
      "How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL Using Drizzle ORM?",
    tags: [
      { _id: "1", name: "postgresql" },
      { _id: "2", name: "drizzle" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "John Doe",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 5,
    views: 100,
    answers: [],
    createdAt: new Date("2023-07-17T10:00:00.000Z"),
  },
  {
    _id: "2",
    title: "What Are the Best Practices for Optimizing MongoDB Queries?",
    tags: [
      { _id: "3", name: "mongodb" },
      { _id: "4", name: "optimization" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Jane Smith",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 10,
    views: 250,
    answers: [],
    createdAt: new Date("2023-08-01T14:30:00.000Z"),
  },
  {
    _id: "3",
    title: "How to Handle Transactions in NestJS with TypeORM?",
    tags: [
      { _id: "5", name: "nestjs" },
      { _id: "6", name: "typeorm" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Alice Johnson",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 7,
    views: 180,
    answers: [],
    createdAt: new Date("2023-09-10T09:15:00.000Z"),
  },
];
const tags = [
  {
    _id: "1",
    name: "react",
    totalQuestions: 10,
  },
  {
    _id: "2",
    name: "vuejs",
    totalQuestions: 5,
  },
  {
    _id: "3",
    name: "angular",
    totalQuestions: 3,
  },
  {
    _id: "4",
    name: "svelte",
    totalQuestions: 2,
  },
  {
    _id: "5",
    name: "nextjs",
    totalQuestions: 1,
  },
  {
    _id: "6",
    name: "nuxtjs",
    totalQuestions: 1,
  },
];
</script>

<template>
  <section
    class="custom-scrollbar bg-light900_dark200 light-border shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 dark:shadow-none max-xl:hidden"
  >
    <div>
      <h3 class="h3-bold text-dark200_light900">Top Questions</h3>

      <div class="mt-7 flex w-full flex-col gap-8">
        <NuxtLink
          v-for="question in topQuestions"
          class="flex cursor-pointer items-center justify-between gap-7"
          :to="`/question/${question._id}`"
        >
          <p class="body-medium text-dark500_light700">
            {{ question.title }}
          </p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            :height="20"
            :width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="h3-bold text-dark200_light900">Popular Tags</h3>
      <div class="mt-7 flex flex-col gap-4">
        <RenderTag
          v-for="tag in tags"
          :key="tag._id"
          :_id="tag._id"
          :name="tag.name"
          :show-count="true"
          :total-questions="tag.totalQuestions"
        />
      </div>
    </div>
  </section>
</template>
