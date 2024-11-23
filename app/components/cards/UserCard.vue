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
            .split(",")
            .map((name) => name[0])
            .join("")
            .toUpperCase()
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
        <div class="flex items-center space-x-2">
          <RenderTag
            v-for="tag in [
              {
                _id: '1',
                name: 'react',
              },
              {
                _id: '2',
                name: 'vuejs',
              },
              {
                _id: '3',
                name: 'angular',
              },
            ]"
            :key="tag._id"
            :_id="tag._id"
            :name="tag.name"
          />
        </div>
      </div>
    </article>
  </NuxtLink>
</template>

<style lang="scss" scoped></style>
