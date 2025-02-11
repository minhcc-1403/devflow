<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import { MdPreview } from "md-editor-v3";
import { questionApi } from "~/apis/devflow/1-question.api";
import { interactionApi } from "~/apis/devflow/3-interaction.api";
import { toast } from "~/components/ui/toast";
import type { QuestionDetail } from "~/types/1-question.type";
import type { ActionEnum, VoteActionEnum } from "~/utils/enums";
import { UserQuestionActivityTypeEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

const route = useRoute();
const questionId = route.params.questionId as string;

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const { data, refresh, status, error } = useAsyncData(() => {
  return questionApi.getById<QuestionDetail>(questionId as string, {
    _populate: "authorId,tagIds",
  });
});

const isVoting = ref(false);
const handleVote = async ({ action }: { action: VoteActionEnum }) => {
  if (!user) {
    return toast({
      title: "Please login to vote",
      description: "You need to be logged in to vote",
      variant: "destructive",
    });
  }

  isVoting.value = true;
  questionApi
    .handleVote(questionId, action)
    .catch((err) => toast({ ...handleApiError(err), variant: "destructive" }))
    .finally(async () => {
      await authStore.fetchMe();
      refresh();
      isVoting.value = false;
    });
};
const handleSave = async ({ action }: { action: ActionEnum }) => {
  if (!user) {
    return toast({
      title: "Please login to save",
      description: "You need to be logged in to save",
      variant: "destructive",
    });
  }

  isVoting.value = true;
  questionApi
    .handleSave(questionId, action)
    .catch((err) => toast({ ...handleApiError(err), variant: "destructive" }))
    .finally(async () => {
      await authStore.fetchMe();
      isVoting.value = false;
    });
};

// Track question views
callOnce(
  `questionId-${questionId}`,
  () => user && interactionApi.viewQuestion(questionId),
);
</script>

<template>
  <QuestionDetailLoading v-if="status === 'pending' && !data" />
  <Error v-else-if="error" :error="error" />

  <div v-else>
    <NoResult
      v-if="!data"
      title="There are no questions to show"
      description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
      discussion. our query could be the next big thing others learn from. Get
      involved! 💡"
      link="/ask-question"
      link-title="Ask a Question"
    />

    <template v-else>
      <div class="flex-start w-full flex-col">
        <div
          class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center sm:gap-2"
        >
          <NuxtLink
            :to="`/profile/${data.authorId?._id}`"
            class="flex items-center justify-start gap-2"
          >
            <Avatar width="22" height="22">
              <AvatarImage
                v-if="data.authorId?.avatar"
                :src="data.authorId.avatar"
                alt="User avatar"
              />
              <AvatarFallback>{{
                data.authorId?.fullName
                  ?.split(",")
                  ?.map((name) => name[0])
                  ?.join("")
                  ?.toUpperCase()
              }}</AvatarFallback>
            </Avatar>

            <p class="paragraph-semibold text-dark300_light700">
              {{ data.authorId?.fullName }}
            </p>
          </NuxtLink>

          <div class="flex justify-end">
            <Votes
              :type="UserQuestionActivityTypeEnum.Question"
              :item-id="data._id"
              :user-id="user?._id"
              :upvote-count="data.upvoteCount"
              :has-upvoted="user?.upvoteQuestionIds?.includes(data._id)"
              :downvote-count="data.downvoteCount"
              :has-downvoted="user?.downvoteQuestionIds?.includes(data._id)"
              :has-saved="user?.savedQuestionIds?.includes(data._id)"
              :is-voting="isVoting"
              @on-vote="handleVote"
              @on-save="handleSave"
            />
          </div>
        </div>

        <h2 class="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {{ data.title }}
        </h2>
      </div>

      <div class="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          icon="basil:clock-outline"
          alt="clock icon"
          :value="`asked ${formatDistanceToNowStrict(data.createdAt, { addSuffix: true })}`"
          title=" Asked"
          text-styles="small-medium text-dark400_light800"
        />

        <Metric
          icon="mage:message-round"
          alt="message"
          :value="formatAndDivideNumber(data.answerCount)"
          title="Answers"
          text-styles="small-medium text-dark400_light800"
        />

        <Metric
          icon="famicons:eye-outline"
          alt="eye"
          :value="formatAndDivideNumber(data.views)"
          title="Views"
          text-styles="small-medium text-dark400_light800"
        />
      </div>

      <MdPreview
        :model-value="data.content"
        :theme="useColorMode().value === 'dark' ? 'dark' : 'light'"
        class="markdown w-full min-w-full"
      />

      <div class="mt-8 flex flex-wrap gap-2">
        <RenderTag
          v-for="tag in data.tagIds"
          :key="tag._id"
          :_id="tag._id"
          :name="tag.name"
          :show-count="false"
        />
      </div>

      <div class="mt-20">
        <AnswerForm :question="data" />
      </div>

      <p class="my-8 border-t" />
      <div class="mt-8">
        <AllAnswers :question-id="questionId" :user-id="user?._id" />
      </div>
    </template>
  </div>
</template>
