import { postServices } from "@/assets/fake-data/Posts";
import { useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";

export const getStoriesQueryConfig = ({
  username = "",
  limit = undefined,
  page = undefined,
  options = {},
  queryKey = {},
  ...rest
} = {}) => {
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
    getStoriesQueryConfig({
      username,
      limit,
      options,
      page,
      ...rest,
    })
  );
};
