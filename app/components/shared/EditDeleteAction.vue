<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import { answerApi } from "~/apis/devflow/3-answer.api";

const props = defineProps<{
  type: "Question" | "Answer";
  itemId: string;
  userId?: string;
}>();

const { confirm } = useConfirm();

const handleEdit = () => {
  navigateTo(`/question/edit/${props.itemId}`);
};

const handleDelete = async () => {
  const ok = await confirm(
    `Are you sure you want to delete this ${props.type}?`,
    "Delete Question",
  );

  if (!ok) return;

  switch (props.type) {
    case "Question":
      await questionApi.deleteManyByIds([props.itemId]);
      refreshNuxtData(`profile_questions_${props.userId}`);
      break;

    case "Answer":
      await answerApi.deleteManyByIds([props.itemId]);
      refreshNuxtData(`answered_questions_${props.userId}`);
      break;
  }
};
</script>

<template>
  <div class="flex items-center justify-end gap-3 max-sm:w-full">
    <NuxtImg
      v-if="type === 'Question'"
      src="https://devflow-rose.vercel.app/assets/icons/edit.svg"
      width="14"
      height="14"
      alt="Edit"
      class="cursor-pointer object-contain"
      @click="handleEdit"
    />

    <NuxtImg
      src="https://devflow-rose.vercel.app/assets/icons/trash.svg"
      width="14"
      height="14"
      alt="Delete"
      class="cursor-pointer object-contain"
      @click="handleDelete"
    />
  </div>
</template>
