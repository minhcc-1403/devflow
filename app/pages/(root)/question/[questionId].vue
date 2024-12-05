<script setup lang="ts">
import { formatDistanceToNowStrict } from "date-fns";
import { useViewQuestion } from "~/api-hooks/interaction.vp";
import { useQuestionDetail } from "~/api-hooks/question.vq";
import { useUpdateUserQuestionActivity } from "~/api-hooks/user_question_activity.vp";
import { toast } from "~/components/ui/toast";
import { UserQuestionActivityTypeEnum, VoteActionEnum } from "~/utils/enums";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

const route = useRoute();
const questionId = route.params.questionId as string;

const authStore = useAuthStore();
const { user, myQuestionActivity } = storeToRefs(authStore);

const { question, refetch } = useQuestionDetail(questionId as string);
const { mutate: updateUserQuestionActivity, isPending } =
  useUpdateUserQuestionActivity();

const handleVote = (input: { action: VoteActionEnum; itemId: string }) => {
  if (!user) {
    return toast({
      title: "Please login to vote",
      description: "You need to be logged in to vote",
      variant: "destructive",
    });
  }

  updateUserQuestionActivity({
    action: input.action,
    questionId: input.itemId,
  });

  refetch();
};

callOnce(questionId, () => useViewQuestion(questionId));
</script>

<template>
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

      <div class="flex justify-end" v-if="question">
        <Votes
          :type="UserQuestionActivityTypeEnum.Question"
          :itemId="question._id"
          :userId="user?._id"
          :upvoteCount="question.upvoteCount"
          :hasUpvoted="
            myQuestionActivity?.votedQuestions?.includes(question._id)
          "
          :downvoteCount="question.downvoteCount"
          :hasDownvoted="
            myQuestionActivity?.downVotedQuestions?.includes(question._id)
          "
          :hasSaved="myQuestionActivity?.savedQuestions?.includes(question._id)"
          :isVoting="isPending"
          @on-vote="handleVote"
        />
      </div>
    </div>

    <h2 class="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
      {{ question?.title }}
    </h2>
  </div>

  <div class="mb-8 mt-5 flex flex-wrap gap-4" v-if="question">
    <Metric
      imgUrl="https://devflow-rose.vercel.app/assets/icons/clock.svg"
      alt="clock icon"
      :value="`asked ${formatDistanceToNowStrict(question.createdAt, { addSuffix: true })}`"
      title=" Asked"
      textStyles="small-medium text-dark400_light800"
    />

    <Metric
      imgUrl="https://devflow-rose.vercel.app/assets/icons/message.svg"
      alt="message"
      :value="formatAndDivideNumber(question.answerCount)"
      title="Answers"
      textStyles="small-medium text-dark400_light800"
    />

    <Metric
      imgUrl="https://devflow-rose.vercel.app/assets/icons/eye.svg"
      alt="eye"
      :value="formatAndDivideNumber(question.views)"
      title="Views"
      textStyles="small-medium text-dark400_light800"
    />
  </div>

  <ParseHTML v-if="question" :data="question?.content" />

  <div class="mt-8 flex flex-wrap gap-2">
    <RenderTag
      v-if="question"
      v-for="tag in question.tagIds"
      :key="tag._id"
      :_id="tag._id"
      :name="tag.name"
      :showCount="false"
    />
  </div>

  <div class="mt-20" v-if="question">
    <AnswerForm :questionId="question._id" />
  </div>

  <p class="my-8 border-t" />
  <div class="mt-8" v-if="question">
    <AllAnswers :questionId="question._id" :userId="user?._id" />
  </div>
</template>

<style lang="scss" scoped></style>
