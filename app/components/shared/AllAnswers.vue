<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import { answerApi } from "~/apis/devflow/3-answer.api";
import { toast } from "~/components/ui/toast";
import type { Answer } from "~/types/1-answer.type";
import type { User } from "~/types/pre-built/2-user";
import { AnswerFilters } from "~/utils/constants/filters";
import { UserQuestionActivityTypeEnum, VoteActionEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";

const props = defineProps<{
  questionId: string;
  userId?: string;
}>();

const route = useRoute();
const queryParams = computed(() => {
  const filter = route.query.filter?.toString();

  const query = {};
  switch (filter) {
    case "highestUpvotes":
      Object.assign(query, { _sort: "-upvotes" });
      break;

    case "lowestUpvotes":
      Object.assign(query, { _sort: "upvotes" });
      break;

    case "recent":
      Object.assign(query, { _sort: "-createdAt" });
      break;

    case "old":
      Object.assign(query, { _sort: "createdAt" });
      break;
  }

  return query;
});

const { data, refresh } = useAsyncData(
  `answered_questions_${props.questionId}`,
  () =>
    answerApi.paginate<Answer & { authorId: User }>({
      questionId: props.questionId,
      _limit: 8,
      _populate: "authorId",
      _sort: "-upvotes",
      ...queryParams.value,
    }),
  {
    watch: [queryParams],
  },
);

const action = ref(VoteActionEnum.Upvote);
const upvoteId = ref();
const {
  execute: updateAnswerVote,
  status,
  error,
} = useAsyncData(() => answerApi.updateVote(action.value, upvoteId.value), {
  immediate: false,
});

watch(error, () => {
  if (error.value) {
    toast({ ...handleApiError(error.value), variant: "destructive" });
  }
});
const handleVote = async (input: {
  action: VoteActionEnum;
  itemId: string;
}) => {
  if (!props.userId) {
    return toast({
      title: "Please login to vote",
      description: "You need to be logged in to vote",
      variant: "destructive",
    });
  }

  action.value = input.action;
  upvoteId.value = input.itemId;

  await updateAnswerVote();
  await refresh();
};
</script>

<template>
  <div class="flex items-center justify-between" v-if="data?.data.length">
    <h3 class="primary-text-gradient">
      {{ data?.paginationInfo._totalData }} Answers
    </h3>

    <Filter :filters="AnswerFilters" />
  </div>

  <div v-if="data?.data.length" v-for="answer in data.data" :key="answer._id">
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

          <div class="flex justify-end">
            <Votes
              :type="UserQuestionActivityTypeEnum.Answer"
              :itemId="answer._id"
              :upvoteCount="answer.upvotes?.length || 0"
              :hasUpvoted="userId ? answer.upvotes?.includes(userId) : false"
              :downvoteCount="answer.downvotes?.length || 0"
              :hasDownvoted="
                userId ? answer.downvotes?.includes(userId) : false
              "
              :isVoting="status === 'pending'"
              @on-vote="handleVote"
            />
          </div>
        </div>
      </div>

      <ParseHTML :data="answer.content" />
    </article>
  </div>
</template>
