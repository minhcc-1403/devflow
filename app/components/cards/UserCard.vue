<script setup lang="ts">
import type { User } from "~/types/pre-built/2-user";

defineProps<{
  user: User;
}>();
</script>

<template>
  <NuxtLink
    :to="`/profile/${user._id}`"
    class="shadow-light100_darknone max-xs:min-w-full xs:w-[260px] w-full"
  >
    <article
      class="bg-light800_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8"
    >
      <Avatar width="100" height="100">
        <AvatarImage v-if="user.avatar" :src="user.avatar" alt="User avatar" />
        <AvatarFallback>{{
          user.fullName
            ?.split(",")
            ?.map((name) => name[0])
            ?.join("")
            ?.toUpperCase()
        }}</AvatarFallback>
      </Avatar>

      <div class="mt-4 text-center">
        <h3 class="h3-bold text-dark200_light900 line-clamp-1">
          {{ user.fullName }}
        </h3>

        <p class="body-regular text-dark500_light500">
          @{{
            user.username ||
            user.email?.split("@")?.[0] ||
            `user${user.phone?.slice(0, -4)}`
          }}
        </p>
      </div>

      <div class="mt-5">
        <div
          v-if="user.topInteractedTags?.length"
          class="flex flex-wrap items-center justify-center gap-2"
        >
          <RenderTag
            v-for="item in user.topInteractedTags"
            :key="item.tag._id"
            :_id="item.tag._id"
            :name="item.tag.name"
          />
        </div>
        <Badge
          v-else
          class="subtle-medium bg-light800_dark300 text-light400_light500 line-clamp-1 inline-flex items-center rounded-md border border-none border-transparent px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >No tags yet</Badge
        >
      </div>
    </article>
  </NuxtLink>
</template>
