<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { htmlToText } from "html-to-text";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useForm } from "vee-validate";
import { chatgptApi } from "~/apis/devflow/0-chatgpt.api";
import { answerApi } from "~/apis/devflow/3-answer.api";
import { toast } from "~/components/ui/toast";
import type { QuestionDetail } from "~/types/1-question.type";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { CreateAnswerSchema } from "~/validations/answer.validation";

const props = defineProps<{
  question: QuestionDetail;
}>();

const colorMode = useColorMode();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const { handleSubmit, errors, setFieldError, resetField, setFieldValue } =
  useForm({
    validationSchema: toTypedSchema(CreateAnswerSchema),
    initialValues: { content: "", questionId: props.question._id },
  });

watch(
  () => props.question,
  () => {
    setFieldValue("questionId", props.question._id);
  },
);

const isPending = ref(false);
const editorRef = ref<any>(null);
const onSubmit = handleSubmit(async (values) => {
  isPending.value = true;

  await answerApi
    .create(values)
    .then(() => {
      refreshNuxtData(`answered_questions_${props.question._id}`);
      resetField("content");
    })
    .catch((error) => {
      handleApiError(error);
      editorRef.value.focus();
    });

  isPending.value = false;
});

const isSubmittingAI = ref(false);
const generateAIAnswer = async () => {
  if (!user.value) return;

  isSubmittingAI.value = true;

  const plainTextQuestion = htmlToText(`
  ${props.question.tagIds.map((tag) => tag.name).join(", ")}
  ${props.question.title},
  ${props.question.content}`);

  await chatgptApi
    .generateAIAnswer(plainTextQuestion)
    .then((res) => {
      setFieldValue("content", res.reply);
    })
    .catch((err) => {
      toast({ ...handleApiError(err), variant: "destructive" });
    });

  isSubmittingAI.value = false;
};
</script>

<template>
  <div>
    <div
      class="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2"
    >
      <h4 class="paragraph-semibold text-dark400_light800">
        Write your answer here
      </h4>

      <Button
        class="btn light-border-2 flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-main-500 shadow-none dark:text-main-500"
        :disabled="isSubmittingAI"
        @click="generateAIAnswer"
      >
        <template v-if="isSubmittingAI">Generating...</template>

        <template v-else>
          <!-- <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/stars.svg"
            width="16"
            height="16"
            alt="star"
            class="object-contain"
          /> -->
          <Icon name="mdi:stars" class="size-4 text-main-500" />

          Generate an AI Answer
        </template>
      </Button>
    </div>
    <form class="flex w-full flex-col gap-4" @submit="onSubmit">
      <FormField v-slot="{ value, handleInput, validate }" name="content">
        <FormItem class="flex w-full flex-col gap-3">
          <FormControl class="mt-3.5">
            <MdEditor
              style="height: 300px; font-size: 12px !important"
              :model-value="value"
              class="h-[120px]"
              :preview="false"
              :toolbars="[
                'title',
                'bold',
                'underline',
                'italic',
                'strikeThrough',
                'quote',
                'unorderedList',
                'orderedList',
                'task',
                'codeRow',
                'code',
                'link',
                'image',
                'table',
                'preview',
              ]"
              language="en-US"
              :theme="colorMode.value === 'dark' ? 'dark' : 'light'"
              @update:model-value="
                (e) => {
                  if (errors['content']) setFieldError('content', '');
                  handleInput(e);
                }
              "
              @blur="(e: any) => validate(e)"
            />

            <!-- <Editor
              :model-value="value"
              :api-key="useRuntimeConfig().public.tinyEditorApiKey"
              :init="{
                height: 350,
                menubar: false,
                toolbar_mode: 'sliding',
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'codesample',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                ],
                toolbar:
                  'undo redo | codesample | bold italic forecolor | alignleft aligncenter | alignright alignjustify | numlist bullist',
                content_style:
                  'body { font-family: Plus Jakarta Sans, sans-serif; font-size:14px; }',
                skin: colorMode.value === 'dark' ? 'oxide-dark' : 'oxide', // oxide
                content_css: colorMode.value === 'dark' ? 'dark' : 'light',
              }"
              initial-value=""
              model-events="change keydown paste undo redo"
              @update:model-value="
                (e: any) => {
                  if (errors['content']) setFieldError('content', '');

                  handleInput(e);
                }
              "
              @init="(evt: any, editor: any) => (editorRef = editor)"
              @blur="validate"
            /> -->
          </FormControl>
          <FormDescription class="body-regular mt-2.5 text-light-500">
            Introduce the problem and explain on what you put in the title.
            Minimum 20 characters.
          </FormDescription>

          <FormMessage class="text-red-500" />
        </FormItem>
      </FormField>

      <div class="flex justify-end">
        <Button
          type="submit"
          class="primary-gradient w-fit !text-light-900"
          :disabled="isPending"
          >{{ isPending ? "Posting..." : "Post Your Answer" }}</Button
        >
      </div>
    </form>
  </div>
</template>
