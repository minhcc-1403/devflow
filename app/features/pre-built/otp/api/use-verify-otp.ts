import { useMutation } from "@tanstack/vue-query";
import { otpApi } from "~/apis/pre-built/10-otp.api";
import type { VerifyOtp } from "~/types/pre-built/10-otp";

export const useVerifyOtp = () => {
  const mutation = useMutation({
    mutationFn: (input: VerifyOtp) => otpApi.verify(input),
  });

  return mutation;
};
