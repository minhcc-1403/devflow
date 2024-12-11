<script setup lang="ts">
import { userApi } from "~/apis/pre-built/2-user.api";

const { data } = useAsyncData("profile_edit", () => {
  return userApi.getById(useRoute().params.id as string, {});
});
</script>

<template>
  <h1 class="h1-bold text-dark100_light900">Edit Profile</h1>

  <div class="mt-9" v-if="data">
    <ProfileForm :user="data" />
  </div>
</template>
