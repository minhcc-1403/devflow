import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryClient } from "~/api-hooks/user.vq";
import { questionApi } from "~/apis/devflow/1-question.api";
import { toast } from "~/components/ui/toast";
import type { QuestionDetail, QuestionLoadMore } from "~/types/1-question.type";
import { handleApiError } from "~/utils/helpers/error-handler.helper";
import type { CreateQuestion } from "~/validations/question.validation";

export const useQuestionCreate = () => {
  const mutation = useMutation({
    mutationFn: (input: CreateQuestion) => questionApi.create(input),
    onError(error) {
      handleApiError(error);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Question created successfully" });
      queryClient.invalidateQueries({ queryKey: ["questions_pagination"] });
    },
  });

  return mutation;
};

export const useQuestionsLoadMore = () => {
  const questions = useState<QuestionLoadMore[]>("questions_loaded", () => []);
  const page = useState("question-page", () => 1);

  const query = useQuery({
    queryKey: ["questions_pagination", page],
    queryFn: () =>
      questionApi.paginate({
        _page: page.value,
        _sort: "-createdAt",
        _populate: "tagIds,authorId",
        _fields: "authorId._id,authorId.avatar,authorId.fullName,tagIds.name",
        _limit: 5,
      }),
  });

  const hasLoadMore = computed(
    () => query.data.value?.paginationInfo?._hasNextPage,
  );

  const loadMore = () => {
    if (hasLoadMore.value) {
      page.value = query.data.value!.paginationInfo._nextPage!;
    }
  };

  watch(query.data, () => {
    console.log({ data: query.data.value });

    if (query.data.value?.data?.length) {
      const items = query.data.value.data as QuestionLoadMore[];
      questions.value.push(...items);
    }
  });

  return {
    questions,
    loadMore,
    isLoading: query.isLoading,
    hasLoadMore,
  };
};

export const useQuestionDetail = (id: string) => {
  const {
    data: question,
    isLoading,
    refetch,
  } = useQuery<QuestionDetail>({
    queryKey: ["question_detail", id],
    queryFn: () =>
      questionApi.getById(id, {
        _populate: "authorId,tagIds",
      }),
  });

  return { question, isLoading, refetch };
};
