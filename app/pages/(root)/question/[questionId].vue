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

const { data: question, refresh } = useAsyncData(() => {
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

callOnce(questionId, () => user && interactionApi.viewQuestion(questionId));
</script>

<template>
  <div>
    <div class="flex-start w-full flex-col">
      <div
        class="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center sm:gap-2"
      >
        <NuxtLink
          :to="`/profile/${question?.authorId._id}`"
          class="flex items-center justify-start gap-2"
        >
          <Avatar width="22" height="22">
            <AvatarImage
              v-if="question?.authorId.avatar"
              :src="question.authorId.avatar"
              alt="User avatar"
            />
            <AvatarFallback>{{
              question?.authorId.fullName
                ?.split(",")
                ?.map((name) => name[0])
                ?.join("")
                ?.toUpperCase()
            }}</AvatarFallback>
          </Avatar>

          <p class="paragraph-semibold text-dark300_light700">
            {{ question?.authorId.fullName }}
          </p>
        </NuxtLink>

        <div v-if="question" class="flex justify-end">
          <Votes
            :type="UserQuestionActivityTypeEnum.Question"
            :item-id="question._id"
            :user-id="user?._id"
            :upvote-count="question.upvoteCount"
            :has-upvoted="user?.upvoteQuestionIds?.includes(question._id)"
            :downvote-count="question.downvoteCount"
            :has-downvoted="user?.downvoteQuestionIds?.includes(question._id)"
            :has-saved="user?.savedQuestionIds?.includes(question._id)"
            :is-voting="isVoting"
            @on-vote="handleVote"
            @on-save="handleSave"
          />
        </div>
      </div>

      <h2 class="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
        {{ question?.title }}
      </h2>
    </div>

    <div v-if="question" class="mb-8 mt-5 flex flex-wrap gap-4">
      <Metric
        img-url="https://devflow-rose.vercel.app/assets/icons/clock.svg"
        alt="clock icon"
        :value="`asked ${formatDistanceToNowStrict(question.createdAt, { addSuffix: true })}`"
        title=" Asked"
        text-styles="small-medium text-dark400_light800"
      />

      <Metric
        img-url="https://devflow-rose.vercel.app/assets/icons/message.svg"
        alt="message"
        :value="formatAndDivideNumber(question.answerCount)"
        title="Answers"
        text-styles="small-medium text-dark400_light800"
      />

      <Metric
        img-url="https://devflow-rose.vercel.app/assets/icons/eye.svg"
        alt="eye"
        :value="formatAndDivideNumber(question.views)"
        title="Views"
        text-styles="small-medium text-dark400_light800"
      />
    </div>

    <MdPreview v-if="question" :model-value="question.content" />

    <!-- <ParseHTML v-if="question" :data="question?.content" /> -->

    <div class="mt-8 flex flex-wrap gap-2">
      <template v-if="question">
        <RenderTag
          v-for="tag in question.tagIds"
          :key="tag._id"
          :_id="tag._id"
          :name="tag.name"
          :show-count="false"
        />
      </template>
    </div>

    <div v-if="question" class="mt-20">
      <AnswerForm :question="question" />
    </div>

    <p class="my-8 border-t" />
    <div v-if="question" class="mt-8">
      <AllAnswers :question-id="question._id" :user-id="user?._id" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
