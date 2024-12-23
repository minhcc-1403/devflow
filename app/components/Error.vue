<script setup lang="ts">
import { handleApiError } from "~/utils/helpers/error-handler.helper";

const props = defineProps<{
  error: any;
}>();

const errors = ref(handleApiError(props.error, { isShowToast: false }));
const goBack = () => {
  useRouter().back();
};
</script>

<template>
  <div
    class="flex h-[200px] w-full flex-col items-center justify-center gap-2 md:h-[400px]"
  >
    <h3 class="text-lg font-semibold text-red-400">{{ errors.title }}</h3>
    <p class="text-center text-sm text-gray-600 dark:text-gray-400">
      {{ errors.description }}
    </p>

    <Button class="mt-5" @click="goBack"> Go Back </Button>
  </div>
</template>
