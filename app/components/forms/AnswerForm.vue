<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useAnswerCreate } from "~/api-hooks/answer.vq";
import { CreateAnswerSchema } from "~/validations/answer.validation";

const props = defineProps<{
  questionId: string;
}>();

const { mutateAsync: createAnswer, isPending: isSubmitting } =
  useAnswerCreate();

const colorMode = useColorMode();

const { handleSubmit, errors, setFieldError, resetField } = useForm({
  validationSchema: toTypedSchema(CreateAnswerSchema),
  initialValues: {
    content: "",
    questionId: props.questionId,
  },
});

const editorRef = ref<any>(null);
const onSubmit = handleSubmit(async (values) => {
  await createAnswer(values);

  resetField("content");
  editorRef.value.focus();

  refreshNuxtData(`answered_questions_${props.questionId}`);
});
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
        class="btn light-border-2 dark:text-primary-500 flex items-center gap-1.5 rounded-sm px-4 py-2.5 text-main-500 shadow-none"
      >
        <NuxtImg
          src="https://devflow-rose.vercel.app/assets/icons/stars.svg"
          width="16"
          height="16"
          alt="star"
          class="object-contain"
        />
        Generate an AI Answer</Button
      >
    </div>
    <form @submit="onSubmit" class="flex w-full flex-col gap-4">
      <FormField v-slot="{ handleInput, value, validate }" name="content">
        <FormItem class="flex w-full flex-col gap-3">
          <FormControl class="mt-3.5">
            <Editor
              :model-value="value"
              @update:model-value="
                (e: any) => {
                  if (errors['content']) setFieldError('content', '');

                  handleInput(e);
                }
              "
              @init="(evt: any, editor: any) => (editorRef = editor)"
              @blur="validate"
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
            />
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
          :disabled="isSubmitting"
          >{{ isSubmitting ? "Posting..." : "Post Your Answer" }}</Button
        >
      </div>
    </form>
  </div>
</template>
