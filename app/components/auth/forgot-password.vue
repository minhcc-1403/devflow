<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { otpApi } from "~/apis/pre-built/10-otp.api";
import { toast } from "~/components/ui/toast";
import type { VerifyOtp } from "~/types/pre-built/10-otp";
import { OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import { ForgotSchema, parseAuthKey } from "~/validations/auth.validation";

interface Props {
  initialValues?: VerifyOtp;
}
interface Emits {
  (e: "submitted", values: VerifyOtp): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { handleSubmit, values, errors, setFieldError } = useForm({
  validationSchema: toTypedSchema(ForgotSchema),
  initialValues: {
    otpCode: "",
    authKey: props.initialValues?.email || props.initialValues?.phone,
  },
});

const isLoading = ref(false);
const onSubmit = handleSubmit(async (formValues) => {
  const { email, phone } = parseAuthKey(formValues.authKey);
  const verifyItem: VerifyOtp = {
    email,
    phone,
    otpCode: formValues.otpCode,
    otpType: OtpTypeEnum.ResetPassword,
    sendOtpTo: phone ? SendOtpToEnum.Phone : SendOtpToEnum.Email,
  };

  isLoading.value = true;
  try {
    await otpApi.checkOtpValid(verifyItem);
    emits("submitted", verifyItem);
  } catch (error) {
    toast({ ...handleApiError(error), variant: "destructive" });
    setFieldError("otpCode", "Invalid OTP Code");
  }

  isLoading.value = false;
});
</script>

<template>
  <form class="space-y-4 md:space-y-6" @submit="onSubmit">
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

    <FormField v-slot="{ componentField }" name="otpCode">
      <FormItem>
        <OtpVerificationControl
          :auth-key="values.authKey"
          :component-field="componentField"
          :otp-type="OtpTypeEnum.ResetPassword"
        />

        <FormMessage class="opacity-85" />
      </FormItem>
    </FormField>

    <div class="flex w-full flex-row items-center py-2">
      <Button
        type="submit"
        class="user-select-none primary-gradient w-full py-5"
        :disabled="errors.otpCode || !values.otpCode || isLoading"
      >
        <Icon
          v-if="isLoading"
          name="lucide:loader"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Continue
      </Button>
    </div>
  </form>
</template>
