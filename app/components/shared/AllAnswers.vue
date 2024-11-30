<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import { useAnswersPagination } from "~/api-hooks/answer.vq";
import { AnswerFilters } from "~/utils/constants/filters";

const props = defineProps<{
  questionId: string;
}>();

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const { data: answersPagination } = useAnswersPagination(props.questionId);
</script>

<template>
  <div
    class="flex items-center justify-between"
    v-if="answersPagination?.data.length"
  >
    <h3 class="primary-text-gradient">
      {{ answersPagination?.paginationInfo._totalData }} Answers
    </h3>

    <Filter :filters="AnswerFilters" />
  </div>

  <div
    v-if="answersPagination?.data.length"
    v-for="answer in answersPagination.data"
    :key="answer._id"
  >
    <article class="light-border border-b py-10">
      <div class="flex items-center justify-between">
        <div
          class="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
        >
          <NuxtLink
            :to="`/profile/${answer.authorId._id}`"
            class="flex flex-1 items-start justify-start gap-2 sm:items-center"
          >
            <Avatar width="18" height="18">
              <AvatarImage
                v-if="answer.authorId.avatar"
                :src="answer.authorId.avatar"
                alt="User avatar"
              />
              <AvatarFallback>{{
                answer.authorId.fullName
                  ?.split(",")
                  ?.map((name) => name[0])
                  ?.join("")
                  ?.toUpperCase()
              }}</AvatarFallback>
            </Avatar>

            <div class="flex flex-col sm:flex-row sm:items-center">
              <p class="body-semibold text-dark300_light700">
                {{ answer.authorId.fullName }}
              </p>
              <p
                class="small-regular text-light400_light500 mt-0.5 line-clamp-1"
              >
                <span class="max-sm:hidden">&nbsp; -</span>
                answered
                {{
                  formatDistanceToNowStrict(answer.createdAt, {
                    addSuffix: true,
                  })
                }}
              </p>
            </div>
          </NuxtLink>

          <div class="flex justify-end">VOTING</div>
        </div>
      </div>

      <ParseHTML :data="answer.content" />
    </article>
  </div>
</template>
