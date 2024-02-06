import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { type User } from "../types.d";

export const useUsers = () => {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } =
    useInfiniteQuery<{ nextCursor: number | undefined; users: User[] }>({
      queryKey: ["users"],
      queryFn: ({ pageParam }: { pageParam: number }) =>
        fetchUsers({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialPageParam: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 3, // 5 min
    });
  return {
    isLoading,
    isError,
    users: data?.pages?.flatMap((page) => page.users) ?? [],
    refetch,
    fetchNextPage,
    hasNextPage,
  };
};
