<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { QuestionSchema } from "~/validations/question.validation";

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(QuestionSchema),
  initialValues: {
    title: "",
    tags: [],
    explanation: "",
  },
});

const onSubmit = handleSubmit((values) => {
  console.log({ values });
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

    <FormField v-slot="{ componentField }" name="explanation">
      <FormItem class="flex w-full flex-col gap-3">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Detailed explanation of your problem
          <span class="text-main-500">*</span></FormLabel
        >
        <FormControl class="mt-3.5">
          <!-- TODO: add a Editor component -->
        </FormControl>
        <FormDescription class="body-regular mt-2.5 text-light-500">
          Introduce the problem and explain on what you put in the title.
          Minimum 20 characters.
        </FormDescription>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="tags">
      <FormItem class="flex w-full flex-col">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Tags <span class="text-main-500">*</span></FormLabel
        >
        <FormControl class="mt-3.5">
          <Input
            type="text"
            class="paragraph-regular placeholder text-dark400_light700 bg-light900_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            v-bind="componentField"
            placeholder="Add tags..."
          />
        </FormControl>
        <FormDescription class="body-regular mt-2.5 text-light-500">
          Add up to 3 tags to describe what your question is about. You need to
          press enter to add a tag.
        </FormDescription>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <Button type="submit"> Submit </Button>
  </form>
</template>
