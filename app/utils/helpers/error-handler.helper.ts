import { toast } from "~/components/ui/toast";
import type { ErrorDetail } from "~/types/error-detail";
import type { Exception } from "~/types/exception";
import { ErrorTypeEnum } from "../enums";

const formatErrorMsg = (errorType: ErrorTypeEnum, details: ErrorDetail[]) => {
  if (errorType === ErrorTypeEnum.ValidationExceptions) {
    // const property = details?.[0]?.property;
    // const message = details?.[0]?.message;
    // return `${property?.[0].toUpperCase()}${property.slice(1)}: ${message}`;
  }
  return details?.[0]?.message || "Something went wrong!";
};

export const handleApiError = (
  error: any,
  options: { isShowToast?: boolean } = { isShowToast: true },
) => {
  let errorType = error.type,
    errorTitle = error.name;

  if (error.data) {
    const errorData: Exception = error.data;

    errorType = errorData.type;
    errorTitle = errorData.title;
  }

  const errorMsg = error.data
    ? formatErrorMsg(errorType, error.data.errors)
    : error.errorMsg;

  if (options?.isShowToast)
    toast({ title: errorTitle, description: errorMsg, variant: "destructive" });

  return {
    title: errorTitle,
    description: errorMsg,
  };
};
