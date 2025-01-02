<script setup lang="ts">
import type { VerifyOtp } from "~/types/pre-built/10-otp";

definePageMeta({ layout: "auth", middleware: "only-visitor" });

const router = useRouter();
const query = useRoute().query;
const isPasswordVisible = ref(false);
const forgotValues = ref<VerifyOtp>();

const onForgotSubmitted = (values: VerifyOtp) => {
  forgotValues.value = values;
  isPasswordVisible.value = true;
};

const onResetPasswordSubmitted = () => {
  const from = query.from as string | undefined;
  if (!from) return router.push({ path: "/" });
  const [path = "", queryString = ""] = from.split("?");
  router.push({
    path,
    query: Object.fromEntries(new URLSearchParams(queryString)),
  });
};

const navigateToSignIn = () => router.push({ path: "/sign-in", query });
const goBack = () => (isPasswordVisible.value = false);
</script>

<template>
  <div class="w-full space-y-6">
    <!-- Heading -->
    <auth-heading
      v-if="!isPasswordVisible"
      title="Forgot Password"
      description="Enter your email or phone to receive OTP code."
    />

    <auth-heading
      v-else
      title="Reset Password"
      description="Enter your password to reset."
      class="text-center"
    />

    <!-- Forgot Password -->
    <forgot-password
      v-if="!isPasswordVisible"
      :initial-values="forgotValues"
      @submitted="onForgotSubmitted"
    />

    <!-- Reset Password -->
    <reset-password
      v-if="isPasswordVisible && forgotValues?.otpCode"
      :initial-values="forgotValues"
      @submitted="onResetPasswordSubmitted"
    />

    <!-- Navigation -->
    <div
      class="flex flex-row items-center justify-center gap-2 font-medium md:text-sm"
    >
      <template v-if="!isPasswordVisible">
        <span class="text-gray-400">Already have an Account? </span>
        <Button
          type="button"
          variant="link"
          class="primary-text-gradient px-0 transition hover:underline hover:opacity-90"
          @click="navigateToSignIn"
        >
          Sign In
        </Button>
      </template>

      <template v-else>
        <span class="text-sm text-gray-400">Want to return? </span>
        <div
          class="primary-text-gradient flex flex-row items-center text-sm font-medium transition hover:underline hover:opacity-90"
        >
          <Icon name="carbon:chevron-left" />
          <span
            class="cursor-pointer transition hover:opacity-90"
            @click="goBack"
          >
            Go back
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
