import { useQuery } from "@tanstack/vue-query";
import { categoryApi } from "~/apis/1-category.api";
import type { Category } from "~/validations/category.validation";

export function useCategoryPagination() {
  const page = useState("category-current-page", () => 1);
  const limit = useState("category-current-limit", () => 1);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["categories", page, limit],
    queryFn: () =>
      categoryApi.paginate({
        _page: page.value,
        _limit: limit.value,
      }),
    staleTime: 5000, // 5 seconds,
  });

  const categories = computed(() => data.value?.data || []);
  const paginationInfo = computed(() => data.value?.paginationInfo);

  const dataLoaded = useState<Category[]>("data-loaded", () => []);
  watch(data, () => {
    if (data.value?.data) dataLoaded.value.push(...data.value.data);
  });

  // Function to change page
  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  // Function to change limit
  const setLimit = (newLimit: number) => (limit.value = newLimit);

  // Function to load more by incrementing the page
  const loadMore = () => {
    if (paginationInfo.value?._nextPage) {
      page.value = paginationInfo.value._nextPage;
      refetch();
    }
  };

  return {
    isLoading,
    categories,
    paginationInfo,
    setPage,
    setLimit,
    loadMore,
    dataLoaded,
  };
}
