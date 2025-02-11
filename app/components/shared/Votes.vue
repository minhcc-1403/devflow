<script setup lang="ts">
import {
  ActionEnum,
  UserQuestionActivityTypeEnum,
  VoteActionEnum,
} from "~/utils/enums";
import { formatAndDivideNumber } from "~/utils/helpers/format.helper";

interface Props {
  type: UserQuestionActivityTypeEnum;
  itemId: string;
  upvoteCount: number;
  downvoteCount: number;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  hasSaved?: boolean;
  isVoting?: boolean;
}

interface Emits {
  (e: "onVote", payload: { action: VoteActionEnum; itemId: string }): void;
  (e: "onSave", payload: { action: ActionEnum; itemId: string }): void;
}

const emits = defineEmits<Emits>();
const props = defineProps<Props>();

const onVote = (voteAction: VoteActionEnum) => {
  emits("onVote", { action: voteAction, itemId: props.itemId });
};

const onSave = (saveAction: ActionEnum) => {
  emits("onSave", { action: saveAction, itemId: props.itemId });
};
</script>

<template>
  <div class="flex gap-4">
    <div class="flex-center gap-2">
      <button
        class="flex cursor-pointer items-center"
        :disabled="isVoting"
        @click="
          onVote(hasUpvoted ? VoteActionEnum.Unvoted : VoteActionEnum.Upvote)
        "
      >
        <!-- <NuxtImg
          :src="`${hasUpvoted ? 'https://devflow-rose.vercel.app/assets/icons/upvoted.svg' : 'https://devflow-rose.vercel.app/assets/icons/upvote.svg'}`"
          alt="upvote"
          width="18"
          height="18"
        /> -->

        <Icon
          v-if="hasUpvoted"
          name="icon-park-solid:up-two"
          class="size-4 text-main-500"
        />
        <Icon v-else name="icon-park-outline:up-two" class="size-4" />
      </button>

      <div class="flex-center bg-light700_dark400 min-w-[18px] rounded-sm p-1">
        <p class="subtle-medium text-dark400_light800">
          {{ formatAndDivideNumber(upvoteCount) }}
        </p>
      </div>
    </div>

    <div class="flex-center gap-2">
      <button
        class="flex cursor-pointer items-center"
        :disabled="isVoting"
        @click="
          onVote(
            hasDownvoted ? VoteActionEnum.Unvoted : VoteActionEnum.Downvote,
          )
        "
      >
        <!-- <NuxtImg
          :src="`${hasDownvoted ? 'https://devflow-rose.vercel.app/assets/icons/downvoted.svg' : 'https://devflow-rose.vercel.app/assets/icons/downvote.svg'}`"
          alt="downvote"
          width="18"
          height="18"
        /> -->
        <Icon
          v-if="hasDownvoted"
          name="icon-park-solid:down-two"
          class="size-4 text-main-500"
        />
        <Icon v-else name="icon-park-outline:down-two" class="size-4" />
      </button>

      <div class="flex-center bg-light700_dark400 min-w-[18px] rounded-sm p-1">
        <p class="subtle-medium text-dark400_light800">
          {{ formatAndDivideNumber(downvoteCount) }}
        </p>
      </div>
    </div>

    <button
      v-if="type === UserQuestionActivityTypeEnum.Question"
      class="flex cursor-pointer items-center"
      :disabled="isVoting"
      @click="onSave(hasSaved ? ActionEnum.Remove : ActionEnum.Add)"
    >
      <!-- <NuxtImg
        :src="`${hasSaved ? 'https://devflow-rose.vercel.app/assets/icons/star-filled.svg' : 'https://devflow-rose.vercel.app/assets/icons/star-red.svg'}`"
        alt="star"
        width="18"
        height="18"
      /> -->
      <Icon
        v-if="hasSaved"
        name="flowbite:star-solid"
        class="size-5 text-yellow-400"
      />
      <Icon v-else name="flowbite:star-outline" class="size-5" />
    </button>
  </div>
</template>
