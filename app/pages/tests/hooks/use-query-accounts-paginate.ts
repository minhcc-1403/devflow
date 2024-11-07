import { useQuery } from "@tanstack/vue-query";
import { accountApi } from "~/apis/0-account.api";

export function useQueryAccountsPaginate() {
  const currentPage = useState("accounts-current-page", () => 1);
  const currentLimit = useState("accounts-current-limit", () => 1);

  const { isLoading, data } = useQuery({
    queryKey: ["accounts", currentPage, currentLimit],
    queryFn: () =>
      accountApi.paginate({
        _page: currentPage.value,
        _limit: currentLimit.value,
      }),
    staleTime: 1000 * 5, // 5 seconds
  });

  const changePage = (value: number) => (currentPage.value = value);
  const changeLimit = (value: number) => (currentLimit.value = value);

  return {
    isLoading,
    accounts: computed(() => data.value?.data || []),
    paginationInfo: computed(() => data.value?.paginationInfo),
    changePage,
  };
}
