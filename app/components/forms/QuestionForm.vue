<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { MdEditor } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useForm, type FieldBindingObject } from "vee-validate";
import { questionApi } from "~/apis/devflow/1-question.api";
import { toast } from "~/components/ui/toast";
import type { QuestionDetail } from "~/types/1-question.type";
import {
  CreateQuestionSchema,
  type CreateQuestion,
} from "~/validations/question.validation";
const colorMode = useColorMode();

const props = defineProps<{
  type: "Edit" | "Create";
  questionDetail?: QuestionDetail;
}>();

const initialValues = {
  title: props.questionDetail?.title || "",
  tags: props.questionDetail?.tagIds?.map((tag) => tag.name) || [],
  content: props.questionDetail?.content || "",
};

const {
  handleSubmit,
  setFieldError,
  setFieldTouched,
  setFieldValue,
  values,
  errors,
} = useForm({
  validationSchema: toTypedSchema(CreateQuestionSchema),
  initialValues,
});

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

const { execute, status } = useAsyncData(
  `${props.type}_question`,
  async () => {
    switch (props.type) {
      case "Create": {
        const res = await questionApi.create(values as CreateQuestion);

        toast({
          title: "Success",
          description: "Question created successfully",
        });
        navigateTo("/");
        refreshNuxtData("questions");

        return res;
      }

      case "Edit":
        return questionApi.updateById(
          props.questionDetail!._id as string,
          values,
        );
    }
  },
  {
    immediate: false,
  },
);

const onSubmit = handleSubmit(() => execute());
</script>

<template>
  <form class="flex w-full flex-col gap-10" @submit="onSubmit">
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
        <FormDescription class="body-regular mt-2.5 text-xs text-light-500">
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
        </FormControl>
        <FormDescription class="body-regular mt-2.5 text-xs text-light-500">
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
              src="https://devflow-rose.vercel.app/assets/icons/close.svg"
              alt="Close icon"
              width="12"
              height="12"
              class="cursor-pointer object-contain invert-0 dark:invert"
              @click="handleRemoveTag(tag, field)"
            />
          </Badge>
        </div>

        <FormDescription class="body-regular mt-2.5 text-xs text-light-500">
          Add up to 3 tags to describe what your question is about. You need to
          press enter to add a tag.
        </FormDescription>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <Button
      type="submit"
      class="primary-gradient w-fit !text-light-900"
      :disabled="
        status === 'pending' ||
        JSON.stringify(initialValues).split('').sort().join('') ===
          JSON.stringify(values).split('').sort().join('')
      "
    >
      <span v-if="type === 'Create'">
        {{ status === "pending" ? "Posting..." : "Ask a Question" }}
      </span>

      <span v-else>
        {{ status === "pending" ? "Editing..." : "Edit Question" }}
      </span>
    </Button>
  </form>
</template>
