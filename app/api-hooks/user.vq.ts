import { QueryClient, useQuery } from "@tanstack/vue-query";
import { userApi } from "~/apis/pre-built/2-user.api";
import type { User } from "~/types/pre-built/2-user";

const queryClient = new QueryClient();

export const useUsersLoadMore = () => {
  const users = useState<User[]>("users_loaded", () => []);
  const page = useState("user-page", () => 1);

  const query = useQuery({
    queryKey: ["users_pagination", page],
    queryFn: () =>
      userApi.paginate({
        _page: page.value,
        _sort: "-createdAt",
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
    if (query.data.value?.data?.length) {
      const items = query.data.value.data as User[];
      users.value.push(...items);
    }
  });

  return {
    users,
    loadMore,
    isLoading: query.isLoading,
    hasLoadMore,
  };
};
