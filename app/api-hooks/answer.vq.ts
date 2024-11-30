import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryClient } from "~/api-hooks/user.vq";
import { answerApi } from "~/apis/devflow/1-answer.api";
import { toast } from "~/components/ui/toast";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateAnswer } from "~/validations/answer.validation";

export const useAnswerCreate = () => {
  const mutation = useMutation({
    mutationFn: (input: CreateAnswer) => answerApi.create(input),
    onError(error) {
      handleApiError(error);
    },
    onSuccess: (data) => {
      console.log({ data });
      toast({ title: "Success", description: "Answer created successfully" });
      queryClient.invalidateQueries({ queryKey: ["questions_pagination"] });
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
