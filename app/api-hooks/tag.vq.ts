import { QueryClient, useQuery } from "@tanstack/vue-query";
import { tagApi } from "~/apis/devflow/2-tag.api";

export const queryClient = new QueryClient();

export const useTagsPagination = () => {
  const page = useState("tags-page", () => 1);
  const limit = useState("tags-limit", () => 1);

  const { data, isLoading } = useQuery({
    queryKey: ["tags_pagination", page],
    queryFn: () =>
      tagApi.paginate({
        _page: page.value,
        _sort: "-questionCount",
        _limit: 8,
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
