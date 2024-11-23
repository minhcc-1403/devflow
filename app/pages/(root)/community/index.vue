<script setup lang="ts">
import { useUsersLoadMore } from "~/api-hooks/user.vq";
import { UserFilters } from "~/utils/constants/filters";

const { users } = useUsersLoadMore();
</script>

<template>
  <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
    <h1 class="h1-bold text-dark100_light900">All Users</h1>
  </div>

  <div class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
    <LocalSearchbar
      route="/community"
      iconPosition="left"
      imgSrc="https://devflow-rose.vercel.app/assets/icons/search.svg"
      placeholder="Search for amazing minds"
      otherClasses="flex-1"
    />

    <Filter
      :filters="UserFilters"
      otherClasses="min-h-[56px] sm:min-w-[170px]"
    />
  </div>

  <section class="mt-12 grid grid-cols-3 gap-4 max-sm:grid-cols-1">
    <UserCard
      v-if="users.length"
      v-for="user in users"
      :key="user._id"
      :user="user"
    />

    <NoResult
      v-else
      title="No users yet"
      description="Join the community and be the first"
      link="/sign-up"
      link-title="Join to be the first"
    />
  </section>
</template>
