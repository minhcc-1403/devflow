<script setup lang="ts">
import { userApi } from "~/apis/pre-built/2-user.api";

const { data } = useAsyncData("profile_edit", () => {
  return userApi.getById(useRoute().params.id as string, {});
});
</script>

<template>
  <div>
    <h1 class="h1-bold text-dark100_light900">Edit Profile</h1>

    <div v-if="data" class="mt-9">
      <ProfileForm :user="data" />
    </div>
  </div>
</template>
