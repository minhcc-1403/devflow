<script setup lang="ts">
import type { ComponentFieldBindingObject } from "vee-validate";
import { otpApi } from "~/apis/pre-built/10-otp.api";
import { toast } from "~/components/ui/toast";
import type { OtpTypeEnum } from "~/utils/enums";
import { SendOtpToEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { parseAuthKey } from "~/validations/auth.validation";

const props = defineProps<{
  componentField?: ComponentFieldBindingObject<any>;
  authKey?: string;
  otpType: OtpTypeEnum;
}>();

const isOTPSent = ref(false);
const isSubmitting = ref(false);
const otpCodeExpiredCountDown = ref(0);

const startCountDown = (seconds: number = 60) => {
  otpCodeExpiredCountDown.value = seconds;
  const interval = setInterval(() => {
    if (otpCodeExpiredCountDown.value > 0) {
      otpCodeExpiredCountDown.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const onSubmitOTP = async () => {
  if (!props.authKey) return;
  isSubmitting.value = true;
  const { email, phone } = parseAuthKey(props.authKey);

  try {
    await otpApi.sendOtp({
      otpType: props.otpType,
      sendOtpTo: phone ? SendOtpToEnum.Phone : SendOtpToEnum.Email,
      email,
      phone,
    });
    startCountDown();
  } catch (error) {
    const msg = handleApiError(error);
    toast({ ...msg, variant: "destructive" });
  }

  isSubmitting.value = false;
  isOTPSent.value = true;
};
</script>

<template>
  <FormControl>
    <div class="relative h-full w-full items-center">
      <!-- OTP Input -->
      <Input
        class="z-10 rounded-e-full py-5 text-xs opacity-90"
        type="text"
        placeholder="OTP Code *"
        v-bind="componentField"
        :disabled="!isOTPSent || isSubmitting"
      />
      <!-- OTP Submit Button -->
      <Button
        class="primary-gradient-light hover:primary-gradient-light absolute inset-y-0 end-0 z-20 h-full rounded-full text-xs opacity-100 transition-opacity duration-300 hover:opacity-90"
        :disabled="!authKey || otpCodeExpiredCountDown || isSubmitting"
        @click="onSubmitOTP"
      >
        <!-- Loader Icon -->
        <Icon
          v-if="isSubmitting"
          name="lucide:loader"
          class="mr-2 h-4 w-4 animate-spin"
        />
        <!-- OTP Button Text -->
        {{
          otpCodeExpiredCountDown
            ? `Resend in ${otpCodeExpiredCountDown}`
            : "Send OTP"
        }}
      </Button>
    </div>
  </FormControl>
</template>
