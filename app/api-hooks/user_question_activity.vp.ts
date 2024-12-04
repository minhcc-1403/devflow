import { useMutation } from "@tanstack/vue-query";
import { userQuestionActivityApi } from "~/apis/devflow/4-user_question_activity.api";
import { toast } from "~/components/ui/toast";
import type { VoteActionEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";

export const useUpdateUserQuestionActivity = () => {
  const mutation = useMutation({
    mutationFn: (input: { questionId: string; action: VoteActionEnum }) =>
      userQuestionActivityApi.updateActivity(input.action, input.questionId),
    onError(error) {
      handleApiError(error);
    },
    onSuccess: (response, variables) => {
      toast({
        title: "Success",
        description: `${variables.action[0]?.toUpperCase() + variables.action.slice(1)} question successfully`,
      });
      useAuthStore().setMyQuestionActivity(response);
    },
  });

  return mutation;
};
