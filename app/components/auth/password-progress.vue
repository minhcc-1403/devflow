<script setup lang="ts">
import { calculatePasswordStrength } from "~/validations/auth.validation";
const props = defineProps<{
  password?: string;
}>();
// const progress = defineModel<number>({ required: true, type: Number });
const progress = ref(0);
watch(
  () => props.password,
  () => {
    if (props.password) {
      progress.value = calculatePasswordStrength(props.password);
    } else {
      progress.value = 0;
    }
  },
);
</script>
<template>
  <div class="flex items-center space-x-2">
    <Progress
      class="h-1 rounded-full bg-secondary"
      :model-value="progress >= 25 ? 100 : 0"
    />
    <Progress
      class="h-1 rounded-full bg-secondary"
      :model-value="progress >= 50 ? 100 : 0"
    />
    <Progress
      class="h-1 rounded-full bg-secondary"
      :model-value="progress >= 75 ? 100 : 0"
    />
    <Progress
      class="h-1 rounded-full bg-secondary"
      :model-value="progress >= 100 ? 100 : 0"
    />
  </div>
</template>
