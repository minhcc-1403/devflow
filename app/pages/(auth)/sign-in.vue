<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { LoginSchema } from "~/validations/auth.validation";

definePageMeta({ layout: "auth", middleware: ["only-visitor"] });

const router = useRouter();
const query = useRoute().query;
const authStore = useAuthStore();
const { loading, tokens } = storeToRefs(authStore);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: toTypedSchema(LoginSchema),
});

const onSubmit = handleSubmit(async (values) => {
  await authStore.login(values);
});

watch(tokens, () => {
  if (tokens.value) {
    // Redirect to the previous page
    if (tokens.value) {
      const from = query.from as string | undefined;
      if (!from) return router.push({ path: "/" });

      const [path = "", queryString = {}] = from.split("?");
      router.push({
        path,
        query: Object.fromEntries(new URLSearchParams(queryString)),
      });
    }
  }
});

const navigateToForgotPass = () =>
  router.push({ path: "/forgot-password", query });
const navigateToSignUp = () => router.push({ path: "/sign-up", query });
</script>

<template>
  <div class="w-full space-y-8">
    <auth-heading title="Welcome back!" description="Your Admin Dashboard" />
    <social-login :disabled="loading" />
    <Separator label="or" />

    <!-- Form -->
    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
      <FormField
        v-slot="{ componentField }"
        name="authKey"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:py-6 md:text-sm"
              type="text"
              placeholder="Email or phone *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ componentField }"
        name="password"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:py-6 md:text-sm"
              type="password"
              placeholder="Password *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />

          <div class="text-end">
            <Button
              type="button"
              variant="link"
              class="primary-text-gradient text-xs"
              @click="navigateToForgotPass"
            >
              Forgot Password ?
            </Button>
          </div>
        </FormItem>
      </FormField>

      <div class="flex w-full flex-row items-center py-2">
        <Button
          type="submit"
          class="user-select-none primary-gradient w-full py-5"
          :disabled="loading"
        >
          <Icon
            v-if="loading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign In
        </Button>
      </div>
    </form>

    <!-- Sign up navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-sm font-medium"
    >
      <span class="text-gray-400">Not a Member yet? </span>
      <Button
        type="button"
        variant="link"
        class="primary-text-gradient px-0 transition hover:underline hover:opacity-90"
        @click="navigateToSignUp"
      >
        Sign up
      </Button>
    </div>
  </div>
</template>
