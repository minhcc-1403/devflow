<script setup lang="ts">
import { HomePageFilters } from "~/utils/constants/filters";

const questions = [
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
  {
    _id: "4",
    title: "What Is the Difference Between Redis Pub/Sub and Streams?",
    tags: [
      { _id: "7", name: "redis" },
      { _id: "8", name: "streams" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Bob Brown",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 15,
    views: 400,
    answers: [],
    createdAt: new Date("2023-07-25T18:45:00.000Z"),
  },
  {
    _id: "5",
    title: "How to Set Up Role-Based Access Control in a Node.js App?",
    tags: [
      { _id: "9", name: "nodejs" },
      { _id: "10", name: "rbac" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Emily White",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 12,
    views: 320,
    answers: [],
    createdAt: new Date("2023-08-15T12:00:00.000Z"),
  },
  {
    _id: "6",
    title: "How to Use Docker Compose for Multi-Container Applications?",
    tags: [
      { _id: "11", name: "docker" },
      { _id: "12", name: "docker-compose" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Michael Green",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 8,
    views: 210,
    answers: [],
    createdAt: new Date("2023-07-30T16:00:00.000Z"),
  },
  {
    _id: "7",
    title: "What Are the Benefits of Using GraphQL Over REST?",
    tags: [
      { _id: "13", name: "graphql" },
      { _id: "14", name: "rest" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Sophia Blue",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 20,
    views: 500,
    answers: [],
    createdAt: new Date("2023-09-20T20:30:00.000Z"),
  },
  {
    _id: "8",
    title: "How to Implement Pagination in a Vue.js Application?",
    tags: [
      { _id: "15", name: "vuejs" },
      { _id: "16", name: "pagination" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Chris Red",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 9,
    views: 2700000,
    answers: [],
    createdAt: new Date("2023-08-05T08:00:00.000Z"),
  },
  {
    _id: "9",
    title: "What Are the Key Differences Between SQL and NoSQL Databases?",
    tags: [
      { _id: "17", name: "sql" },
      { _id: "18", name: "nosql" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Olivia Brown",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 14,
    views: 390111,
    answers: [],
    createdAt: new Date("2023-07-22T11:00:00.000Z"),
  },
  {
    _id: "10",
    title: "How to Secure API Endpoints in a Nuxt3 Application?",
    tags: [
      { _id: "19", name: "nuxt3" },
      { _id: "20", name: "security" },
    ],
    author: {
      _id: Math.random().toString(),
      fullName: "Ethan Black",
      avatar:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18ybUFCTWQxbDM0VXRLQjdEV3VjUUxpdk9VRkQifQ&w=32&q=75",
    },
    upvotes: 11,
    views: 310,
    answers: [],
    createdAt: new Date("2015-08-12T14:00:00.000Z"),
  },
];
</script>

<template>
  <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
    <h1 class="h1-bold text-dark100_light900">All Questions</h1>

    <NuxtLink to="/ask-question" class="flex justify-end max-sm:w-full">
      <Button class="primary-gradient min-h-[46px] px-4 py-3 text-gray-100"
        >Ask a Question</Button
      >
    </NuxtLink>
  </div>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for questions"
      otherClasses="flex-1"
    />

    <Filter
      :filters="HomePageFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
      containerClasses="hidden max-md:flex"
    />
  </div>

  <HomeFilters />

  <div class="mt-10 flex w-full flex-col gap-6">
    <QuestionCard
      v-if="questions.length > 0"
      v-for="question in questions"
      :key="question._id"
      :_id="question._id"
      :title="question.title"
      :tags="question.tags"
      :author="question.author"
      :upvotes="question.upvotes"
      :views="question.views"
      :answers="question.answers"
      :createdAt="question.createdAt"
    />

    <NoResult
      v-else
      title="There are no question to show"
      description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
      link="/ask-question"
      linkTitle="Ask a Question"
    />
  </div>
</template>
