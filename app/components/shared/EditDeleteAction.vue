<script setup lang="ts">
import { questionApi } from "~/apis/devflow/1-question.api";
import { answerApi } from "~/apis/devflow/3-answer.api";

const props = defineProps<{
  type: "Question" | "Answer";
  itemId: string;
}>();

const handleEdit = () => {};
const handleDelete = async () => {
  switch (props.type) {
    case "Question":
      await questionApi.deleteManyByIds([props.itemId]);
      break;

    case "Answer":
      await answerApi.deleteManyByIds([props.itemId]);
      break;
  }
};
</script>

<template>
  <div class="flex items-center justify-end gap-3 max-sm:w-full">
    <template v-if="type === 'Question'">
      <NuxtImg
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
    </template>
  </div>
</template>
