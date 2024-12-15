<script setup lang="ts">
import { userApi } from "~/apis/pre-built/2-user.api";
import { UserFilters } from "~/utils/constants/filters";

const route = useRoute();
const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const filter = route.query.filter?.toString();

  const query = {};
  if (q)
    Object.assign(query, {
      "_oneOf.fullName": new RegExp(q, "i").toString(),
      "_oneOf.phone": new RegExp(q, "i").toString(),
      "_oneOf.email": new RegExp(q, "i").toString(),
      "_oneOf.username": new RegExp(q, "i").toString(),
    });

  switch (filter) {
    case "new_users":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "old_users":
      Object.assign(query, { _sort: "createdAt" });
      break;

    case "top_contributors":
      Object.assign(query, { _sort: "-reputation" });
      break;
  }

  return query;
});

const { data } = useAsyncData(
  () => {
    return userApi.paginate({
      _limit: 5,
      _fields: "_id,fullName,username,email,phone,avatar,topInteractedTags",
      ...queryParams.value,
    });
  },
  {
    watch: [queryParams],
  },
);
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

  <section
    v-if="data?.data"
    class="mt-12 grid grid-cols-3 gap-4 max-sm:grid-cols-1"
  >
    <UserCard v-for="user in data.data" :key="user._id" :user="user" />
  </section>

  <NoResult
    v-else
    title="No users yet"
    description="Join the community and be the first"
    link="/sign-up"
    link-title="Join to be the first"
  />
</template>
