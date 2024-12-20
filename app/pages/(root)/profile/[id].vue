<script setup lang="ts">
import { userApi } from "~/apis/pre-built/2-user.api";
import type { User } from "~/types/pre-built/2-user";
import { getJoinedDate } from "~/utils/helpers/format.helper";

const userId = useRoute().params.id as string;
const profile = useState<User | null>(`profile_${userId}`, () => null);

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

callOnce(userId, async () => {
  profile.value = await userApi.getById(userId);
});
</script>

<template>
  <div>
    <div class="flex flex-col-reverse items-center justify-between sm:flex-row">
      <div class="flex flex-col items-start gap-4 lg:flex-row">
        <Avatar class="h-[140px] w-[140px]">
          <AvatarImage
            v-if="profile?.avatar"
            :src="profile?.avatar"
            alt="User avatar"
          />
          <AvatarFallback>{{
            profile?.fullName
              ?.split(",")
              ?.map((name) => name[0])
              ?.join("")
              ?.toUpperCase()
          }}</AvatarFallback>
        </Avatar>

        <div class="mt-3">
          <h2 class="h2-bold text-dark100_light900">{{ profile?.fullName }}</h2>
          <p class="paragraph-regular text-dark200_light800">
            @{{ profile?.username || profile?.email?.split("@")?.[0] }}
          </p>

          <div
            v-if="profile"
            class="mt-5 flex flex-wrap items-center justify-start gap-5"
          >
            <ProfileLink
              title="Portfolio"
              img-url="https://devflow-rose.vercel.app/assets/icons/link.svg"
              href="https://github.com/minh-me"
            />

            <ProfileLink
              title="Việt Nam"
              img-url="https://devflow-rose.vercel.app/assets/icons/location.svg"
            />

            <ProfileLink
              :title="getJoinedDate(profile.createdAt)"
              img-url="https://devflow-rose.vercel.app/assets/icons/calendar.svg"
            />
          </div>

          <p
            v-if="profile?.bio"
            class="paragraph-regular text-dark400_light800 mt-5"
          >
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic,
            commodi. Quia eius laborum quo illo omnis eaque dolorem eligendi
            architecto quae incidunt exercitationem, voluptates consequuntur
            velit quaerat, expedita, magnam fuga?
          </p>
        </div>
      </div>

      <div class="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
        <NuxtLink
          v-if="user._id === profile?._id"
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

    <Stats
      :questions-count="profile?.questionsCount"
      :answers-count="profile?.answersCount"
    />

    <div class="mt-10 flex gap-10">
      <Tabs default-value="top-posts" class="flex-1">
        <TabsList class="bg-light800_dark400 min-h-[42px] p-1">
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
