<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { userApi } from "~/apis/pre-built/2-user.api";
import type { User } from "~/types/pre-built/2-user";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { UpdateUserSchema } from "~/validations/user.validation";

const props = defineProps<{
  user: User;
}>();

const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(UpdateUserSchema),
  initialValues: {
    avatar: props.user.avatar || "",
    fullName: props.user.fullName || "",
    username: props.user.username || "",
    email: props.user.email || "",
    phone: props.user.phone || "",
    bio: props.user.bio || "",
    portfolioWebsite: props.user.portfolioWebsite || "",
    location: props.user.location || "",
  },
});

const { execute, status, error } = useAsyncData(
  () => userApi.updateById(props.user._id!, values),
  {
    immediate: false,
  },
);

const onSubmit = handleSubmit(async () => {
  await execute();

  switch (status.value) {
    case "success":
      useRouter().go(-1);
      break;

    case "error":
      handleApiError(error.value);
      break;
  }
});
</script>

<template>
  <form class="flex w-full flex-col gap-10" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="fullName">
      <FormItem class="space-y-3.5">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >FullName <span class="text-main-500">*</span></FormLabel
        >
        <FormControl>
          <Input
            class="paragraph-regular placeholder light-border-2 bg-light700_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Your name"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="username">
      <FormItem class="space-y-3.5">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Username <span class="text-main-500">*</span></FormLabel
        >
        <FormControl>
          <Input
            class="paragraph-regular placeholder light-border-2 bg-light700_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Your username"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="portfolioWebsite">
      <FormItem class="space-y-3.5">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Portfolio Link
        </FormLabel>
        <FormControl>
          <Input
            type="url"
            class="paragraph-regular placeholder light-border-2 bg-light700_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Your portfolio URL"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="location">
      <FormItem class="space-y-3.5">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Location
        </FormLabel>
        <FormControl>
          <Input
            class="paragraph-regular placeholder light-border-2 bg-light700_dark300 text-dark300_light700 min-h-[56px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Where are you from?"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="bio">
      <FormItem class="space-y-3.5">
        <FormLabel class="paragraph-semibold text-dark300_light900"
          >Bio
        </FormLabel>
        <FormControl>
          <Textarea
            class="paragraph-regular placeholder light-border-2 bg-light700_dark300 text-dark300_light700 min-h-[80px] border shadow-none outline-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="What's special about you?"
            v-bind="componentField"
          />
        </FormControl>

        <FormMessage class="text-red-500" />
      </FormItem>
    </FormField>

    <div class="mt-7 flex justify-end">
      <Button
        type="submit"
        class="primary-gradient w-fit"
        :disabled="status === 'pending'"
      >
        {{ status === "pending" ? "Editing..." : "Edit" }}
      </Button>
    </div>
  </form>
</template>
