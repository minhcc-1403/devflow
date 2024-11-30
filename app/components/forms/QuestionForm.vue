<script setup lang="ts">
import Editor from "@tinymce/tinymce-vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, type FieldBindingObject } from "vee-validate";
import { useQuestionCreate } from "~/api-hooks/question.vq";
import { CreateQuestionSchema } from "~/validations/question.validation";
const colorMode = useColorMode();

const type: "Edit" | "Create" = "Create";
const { mutateAsync: createQuestion, isPending: isCreatePending } =
  useQuestionCreate();

const { handleSubmit, setFieldError, setFieldTouched, setFieldValue } = useForm(
  {
    validationSchema: toTypedSchema(CreateQuestionSchema),
    initialValues: {
      title: "",
      tags: [],
      content: "",
    },
  },
);

const tagValue = ref("");
const handleAddTag = (field: FieldBindingObject) => {
  if (tagValue.value !== "") {
    if (tagValue.value.length > 15) {
      return setFieldError("tags", "Tag value must be less than 15 characters");
    }

    if (!field.value?.includes(tagValue.value)) {
      setFieldValue("tags", [...field.value!, tagValue.value]);
      setFieldError("tags", "");
      tagValue.value = "";
    }
  } else {
    setFieldTouched("tags", true);
  }
};

const handleRemoveTag = (tag: string, field: FieldBindingObject) => {
  const newTags = field.value?.filter((t: any) => t !== tag);

  setFieldValue("tags", newTags);
};

const isSubmitting = ref(false);

const onSubmit = handleSubmit(async (values) => {
  await createQuestion(values);
  navigateTo("/");
});
</script>

<template>
  <form @submit="onSubmit" class="flex w-full flex-col gap-10">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem class="flex w-full flex-col">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Question Title <span class="text-main-500">*</span></FormLabel
        >
        <FormControl class="mt-3.5">
          <Input
            type="text"
            class="paragraph-regular placeholder text-dark400_light700 bg-light900_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription class="body-regular mt-2.5 text-light-500">
          Be specific and imagine you’re asking a question to another person.
        </FormDescription>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ handleInput, value, validate }" name="content">
      <FormItem class="flex w-full flex-col gap-3">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Detailed explanation of your problem
          <span class="text-main-500">*</span></FormLabel
        >
        <FormControl class="mt-3.5">
          <Editor
            :model-value="value"
            @update:model-value="
              (e) => {
                handleInput(e);
                validate();
              }
            "
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

    <FormField v-slot="{ field }" name="tags">
      <FormItem class="flex w-full flex-col">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Tags <span class="text-main-500">*</span></FormLabel
        >
        <FormControl class="mt-3.5">
          <Input
            v-model="tagValue"
            type="text"
            class="paragraph-regular placeholder text-dark400_light700 bg-light900_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Add tags..."
            @keydown.enter.prevent="handleAddTag(field)"
          />
        </FormControl>

        <div v-if="field.value.length > 0" class="flex-start mt-2.5 gap-2.5">
          <Badge
            v-for="tag in field.value"
            :key="tag"
            class="subtle-medium bg-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
          >
            {{ tag }}

            <NuxtImg
              @click="handleRemoveTag(tag, field)"
              src="https://devflow-rose.vercel.app/assets/icons/close.svg"
              alt="Close icon"
              width="12"
              height="12"
              class="cursor-pointer object-contain invert-0 dark:invert"
            />
          </Badge>
        </div>

        <FormDescription class="body-regular mt-2.5 text-light-500">
          Add up to 3 tags to describe what your question is about. You need to
          press enter to add a tag.
        </FormDescription>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="primary-gradient w-fit !text-light-900"
      :disabled="isSubmitting || isCreatePending"
    >
      <span v-if="type === 'Create'">
        {{ isCreatePending ? "Posting..." : "Ask a Question" }}
      </span>

      <span v-else>
        {{ isSubmitting ? "Editing..." : "Edit Question" }}
      </span>
    </Button>
  </form>
</template>
