<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useCheckOtpValid } from "~/features/pre-built/otp/api/use-check-otp-valid";
import type { VerifyOtp } from "~/types/pre-built/10-otp";
import { OtpTypeEnum, SendOtpToEnum } from "~/utils/enums";
import { ForgotSchema, parseAuthKey } from "~/validations/auth.validation";

interface Props {
  initialValues?: VerifyOtp;
}
interface Emits {
  (e: "submitted", values: VerifyOtp): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { mutateAsync, isPending } = useCheckOtpValid();
const { handleSubmit, values, errors, setFieldError } = useForm({
  validationSchema: toTypedSchema(ForgotSchema),
  initialValues: {
    otpCode: "",
    authKey: props.initialValues?.email || props.initialValues?.phone,
  },
});

const onSubmit = handleSubmit(async (formValues) => {
  const { email, phone } = parseAuthKey(formValues.authKey);
  const verifyItem: VerifyOtp = {
    email,
    phone,
    otpCode: formValues.otpCode,
    otpType: OtpTypeEnum.ResetPassword,
    sendOtpTo: phone ? SendOtpToEnum.Phone : SendOtpToEnum.Email,
  };

  try {
    await mutateAsync(verifyItem);
    emits("submitted", verifyItem);
  } catch {
    setFieldError("otpCode", "Invalid OTP Code");
  }
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
        class="user-select-none w-full py-5"
        :disabled="errors.otpCode || !values.otpCode || isPending"
      >
        <Icon
          v-if="isPending"
          name="lucide:loader"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Continue
      </Button>
    </div>
  </form>
</template>
