<script setup lang="ts">
import { generalApi } from "~/apis/devflow/0-general.api";
import { userApi } from "~/apis/pre-built/2-user.api";
import { getJoinedDate } from "~/utils/helpers/format.helper";

const userId = useRoute().params.id as string;
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const {
  data: profile,
  status: profileStatus,
  error: profileError,
} = useAsyncData(`profile_${userId}`, () => {
  return userApi.getById(userId);
});

const {
  data: userBadgeCounts,
  status: userBadgeCountsStatus,
  error: userBadgeCountsError,
} = useAsyncData(`user_badge_counts_${userId}`, () => {
  return generalApi.getUserBadgeCounts(userId);
});
</script>

<template>
  <div>
    <ProfileLoading v-if="profileStatus === 'pending' && !profile" />
    <Error v-else-if="profileError" :error="profileError" />

    <template v-else>
      <template v-if="!profile">
        <NoResult
          title="User not found"
          description="The user you are looking for does not exist."
          img-url="https://devflow-rose.vercel.app/assets/images/no-result.svg"
        />
      </template>

      <div
        v-else
        class="flex flex-col-reverse items-center justify-between gap-x-2 sm:flex-row"
      >
        <div class="flex flex-col items-start gap-4 lg:flex-row">
          <Avatar class="h-[140px] w-[140px]">
            <AvatarImage
              v-if="profile.avatar"
              :src="profile.avatar"
              alt="User avatar"
            />
            <AvatarFallback>{{
              profile.fullName
                .split(",")
                .map((name) => name[0])
                .join("")
                .toUpperCase()
            }}</AvatarFallback>
          </Avatar>

          <div class="mt-3">
            <h2 class="h2-bold text-dark100_light900">
              {{ profile.fullName }}
            </h2>
            <p
              v-if="profile.username || profile.email"
              class="paragraph-regular text-dark200_light800"
            >
              @{{ profile.username || profile?.email?.split("@")?.[0] }}
            </p>

            <div class="mt-5 flex flex-wrap items-center justify-start gap-5">
              <ProfileLink
                v-if="profile.portfolioWebsite"
                title="Portfolio"
                img-url="https://devflow-rose.vercel.app/assets/icons/link.svg"
                :href="profile.portfolioWebsite"
              />

              <ProfileLink
                v-if="profile.location"
                :title="profile.location"
                img-url="https://devflow-rose.vercel.app/assets/icons/location.svg"
              />

              <ProfileLink
                :title="getJoinedDate(profile.createdAt)"
                img-url="https://devflow-rose.vercel.app/assets/icons/calendar.svg"
              />
            </div>

            <p
              v-if="profile.bio"
              class="paragraph-regular text-dark400_light800 mt-5"
            >
              {{ profile.bio }}
            </p>
          </div>
        </div>

        <div class="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <NuxtLink
            v-if="user?._id === profile._id"
            :to="`/profile/edit/${userId}`"
          >
            <Button
              variant="secondary"
              class="paragraph-medium text-dark300_light900 min-h-[46px] min-w-[175px] px-4"
            >
              Edit Profile
            </Button>
          </NuxtLink>
        </div>
      </div>
    </template>

    <StatsLoading
      v-if="userBadgeCountsStatus === 'pending' && !userBadgeCounts"
    />
    <Error v-else-if="userBadgeCountsError" :error="userBadgeCountsError" />

    <Stats
      v-else
      :questions-count="profile?.questionsCount"
      :answers-count="profile?.answersCount"
      :user-badge-counts="userBadgeCounts"
    />

    <div class="mt-10 flex gap-10">
      <Tabs default-value="top-posts" class="flex-1">
        <TabsList class="bg-light800_dark400 min-h-[42px] gap-2 p-2">
          <TabsTrigger value="top-posts" class="tab">Top Posts</TabsTrigger>
          <TabsTrigger value="answers" class="tab"> Answers </TabsTrigger>
        </TabsList>

        <TabsContent value="top-posts">
          <QuestionTab :user-id="userId" />
        </TabsContent>
        <TabsContent value="answers">
          <AnswerTab :user-id="userId" />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
