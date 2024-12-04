import { QueryClient, useMutation, useQuery } from "@tanstack/vue-query";
import { answerApi } from "~/apis/devflow/3-answer.api";
import { toast } from "~/components/ui/toast";
import type { VoteActionEnum } from "~/utils/enums";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateAnswer } from "~/validations/answer.validation";

export const useAnswerCreate = () => {
  const mutation = useMutation({
    mutationFn: (input: CreateAnswer) => answerApi.create(input),
    onError(error) {
      handleApiError(error);
    },
    onSuccess: (data) => {
      toast({ title: "Success", description: "Answer created successfully" });
      // queryClient.refetchQueries({ // handle reload answers
      //   queryKey: ["answers_pagination"],
      //   exact: false,
      // });
    },
  });

  return mutation;
};

export const useAnswerUpdateVote = () => {
  const mutation = useMutation({
    mutationFn: (input: { answerId: string; action: VoteActionEnum }) =>
      answerApi.updateVote(input.action, input.answerId),
    onError(error) {
      handleApiError(error);
    },
    onSuccess: (data, variables) => {
      toast({
        title: "Success",
        description: `${variables.action.slice(0, 1).toUpperCase() + variables.action.slice(1)} successfully`,
      });

      return data;
    },
  });

  return mutation;
};

export const useAnswersPagination = (questionId: string) => {
  const page = useState("answers-page", () => 1);
  const limit = useState("answers-limit", () => 1);

  const { data, isLoading } = useQuery({
    queryKey: ["answers_pagination", page, questionId],
    queryFn: () =>
      answerApi.paginate({
        questionId,
        _page: page.value,
        _limit: 8,
        _populate: "authorId",
      }),
    staleTime: 5000, // 5 seconds,
  });

  const setPage = (newPage: number) => (page.value = newPage);
  const setLimit = (newLimit: number) => (limit.value = newLimit);

  return {
    data,
    setPage,
    setLimit,
    isLoading,
  };
};

export const refreshAnswersPagination = (queryClient: QueryClient) => {
  const queryCache = queryClient
    .getQueryCache()
    .getAll()
    .find((query) => query.queryKey[0] === "answers_pagination");

  if (queryCache?.queryKey)
    queryClient.invalidateQueries({
      queryKey: queryCache.queryKey,
    });
};
