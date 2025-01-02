<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { AccountTypeEnum, OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";
import { RegisterSchema, parseAuthKey } from "~/validations/auth.validation";

definePageMeta({ layout: "auth", middleware: "only-visitor" });

const router = useRouter();
const query = useRoute().query;
const authStore = useAuthStore();
const { loading, tokens } = storeToRefs(authStore);

const { handleSubmit, values, errors } = useForm({
  validationSchema: toTypedSchema(RegisterSchema),
});

const onSubmit = handleSubmit(async ({ authKey, ...values }) => {
  const { email, phone } = parseAuthKey(authKey);

  await authStore.register({
    ...values,
    email,
    phone,
    accountType: AccountTypeEnum.Local,
    otpType: OtpTypeEnum.Register,
    sendOtpTo: phone ? SendOtpToEnum.Phone : SendOtpToEnum.Email,
  });
});

watch(tokens, () => {
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
});

const navigateToSignIn = () => router.push({ path: "/sign-in", query });
</script>

<template>
  <div class="w-full space-y-6">
    <auth-heading
      title="Create an Account"
      description="Your Admin Dashboard"
    />
    <social-login :disabled="loading" />
    <Separator label="or" />

    <!-- Form -->
    <form class="space-y-4 md:space-y-6" @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="fullName">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:text-sm"
              type="text"
              placeholder="Full name *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="authKey">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:text-sm"
              type="text"
              placeholder="Email or phone *"
              v-bind="componentField"
            />
          </FormControl>

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormControl>
            <Input
              class="py-5 opacity-90 md:text-sm"
              type="password"
              placeholder="Password *"
              v-bind="componentField"
            />
          </FormControl>

          <!-- Password requirements -->
          <div class="space-y-2 py-1">
            <password-progress :password="values.password" />

            <p
              class="text-xs"
              :class="[
                errors['password']
                  ? 'text-red-500 opacity-90'
                  : 'text-gray-400 opacity-90',
              ]"
            >
              Use 6 or more characters with a mix of letters, numbers & symbols.
            </p>
          </div>
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="otpCode">
        <FormItem>
          <otp-verification-control
            :component-field="componentField"
            :auth-key="errors.authKey ? undefined : values.authKey"
            :otp-type="OtpTypeEnum.Register"
          />

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange }"
        type="checkbox"
        name="acceptTerms"
      >
        <FormItem>
          <div class="flex items-center gap-x-2 space-y-0">
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>

            <FormLabel
              class="user-select-none md: text-xs leading-none text-gray-700"
            >
              I Accept the
              <NuxtLink
                to="/"
                target="_blank"
                class="primary-text-gradient text-xs transition-all hover:underline hover:opacity-90 md:text-sm"
                >Terms</NuxtLink
              >
            </FormLabel>
          </div>

          <FormMessage class="opacity-85" />
        </FormItem>
      </FormField>

      <div class="flex w-full flex-row items-center py-2">
        <Button
          type="submit"
          class="user-select-none primary-gradient w-full py-5"
          :disabled="errors.otpCode || !values.otpCode || loading"
        >
          <Icon
            v-if="loading"
            name="lucide:loader"
            class="mr-2 h-4 w-4 animate-spin"
          />
          Sign Up
        </Button>
      </div>
    </form>

    <!-- Sign in navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 text-sm font-medium"
    >
      <span class="text-gray-400">Already have an Account? </span>
      <Button
        type="button"
        variant="link"
        class="primary-text-gradient px-0 transition hover:underline hover:opacity-90"
        @click="navigateToSignIn"
      >
        Sign In
      </Button>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
