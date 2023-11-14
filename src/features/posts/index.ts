import { postServices } from "@/assets/fake-data/Posts";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";

export const getPostsQueryConfig = ({ username = "", limit = undefined, page = undefined, options = {}, queryKey = {}, ...rest } = {}) => {
  const params = {
    username,
    limit,
    page,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/posts", { ...originalParams, ...queryKey }],
    queryFn: () => postServices.getPosts(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const usePostsQuery = ({ username, limit, page, options, ...rest }: any = {}) => {
  return useQuery(
    getPostsQueryConfig({
      username,
      limit,
      options,
      page,
      ...rest,
    })
  );
};

//================================*Infinite Queries*================================

export const fetchInfinitePosts = async (context: any) => {
  const page = Number(context?.pageParam || 1);
  const [_, params] = context?.queryKey;

  const username = String(params?.username || "");

  const response = await postServices.getPosts({ limit: 1, page: page, username: username });

  return {
    data: response,
    page: page + 1,
  };
};

export const getPostsInfiniteQueryConfig = ({
  username = "",
  limit = undefined,
  page = undefined,
  options = {},
  queryKey = {},
  ...rest
} = {}) => {
  const params = {
    username,
    page,
    limit,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/posts", { ...originalParams, ...queryKey }],
    queryFn: fetchInfinitePosts,
    options: { retry: 1, ...options },
    getNextPageParam: (lastPage: any) => lastPage.page,
    ...rest,
  };
};

export const usePostsInfiniteQuery = ({ username, page, limit, options, ...rest }: any = {}) =>
  useInfiniteQuery(getPostsInfiniteQueryConfig({ username, page, limit, options, ...rest }));
