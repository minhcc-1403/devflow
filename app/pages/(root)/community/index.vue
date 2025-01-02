<script setup lang="ts">
import { userApi } from "~/apis/pre-built/2-user.api";
import { UserFilters } from "~/utils/constants/filters";

const route = useRoute();

const queryParams = computed(() => {
  const q = route.query.q?.toString();
  const filter = route.query.filter?.toString();
  const page = route.query._page?.toString();

  const query: Record<string, any> = {};

  if (page) query._page = page;

  if (q) {
    const regex = new RegExp(q, "i").toString();
    Object.assign(query, {
      "_oneOf.fullName": regex,
      "_oneOf.phone": regex,
      "_oneOf.email": regex,
      "_oneOf.username": regex,
    });
  }

  const sortOptions: Record<string, string> = {
    new_users: "-createdAt",
    old_users: "createdAt",
    top_contributors: "-reputation",
  };

  if (filter && sortOptions[filter]) {
    query._sort = sortOptions[filter];
  }

  return query;
});

const { data, status, error } = useAsyncData(
  () =>
    userApi.paginate({
      _limit: 12,
      _fields: "_id,fullName,username,email,phone,avatar,topInteractedTags",
      ...queryParams.value,
    }),
  { watch: [queryParams] },
);
</script>

<template>
  <div>
    <!-- Header -->
    <div class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row">
      <h1 class="h1-bold text-dark100_light900">All Users</h1>
    </div>

    <!-- Search & Filter -->
    <div
      class="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center"
    >
      <LocalSearchbar
        href="/community"
        icon-position="left"
        img-src="https://devflow-rose.vercel.app/assets/icons/search.svg"
        placeholder="Search for amazing minds"
        other-classes="flex-1"
      />

      <Filter
        :filters="UserFilters"
        other-classes="min-h-[56px] sm:min-w-[170px]"
      />
    </div>

    <!-- Content -->
    <div class="mt-12">
      <CommunityLoading v-if="status === 'pending' && !data?.data" />
      <Error v-else-if="error" :error="error" />

      <template v-else>
        <NoResult
          v-if="!data?.data?.length"
          title="No users yet"
          description="Join the community and be the first"
          link="/sign-up"
          link-title="Join to be the first"
        />

        <template v-else>
          <section
            class="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3"
          >
            <UserCard v-for="user in data.data" :key="user._id" :user="user" />
          </section>

          <PaginationInfo :data="data.paginationInfo" />
        </template>
      </template>
    </div>
  </div>
</template>
