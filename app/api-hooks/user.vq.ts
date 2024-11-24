import { QueryClient, useQuery } from "@tanstack/vue-query";
import { userApi } from "~/apis/pre-built/2-user.api";
import type { User } from "~/types/pre-built/2-user";

export const queryClient = new QueryClient();

export const useUsersCommunity = () => {
  const users = useState<User[]>("users_community", () => []);
  const page = useState("users_community-page", () => 1);

  const query = useQuery({
    queryKey: ["users_community_pagination", page],
    queryFn: () =>
      userApi.paginate({
        _page: page.value,
        _sort: "-createdAt",
        _limit: 5,
        _fields: "_id,fullName,username,email,phone,avatar,topInteractedTags",
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
