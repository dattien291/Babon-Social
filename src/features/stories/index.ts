import storyServices from "@/services/storyServices";
import { useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";
import { UseQueryResult } from "@tanstack/react-query";

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
    queryKey: ["/stories", { ...originalParams, ...queryKey }],
    queryFn: () => storyServices.getStories(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useStoriesQuery = ({ username, limit, page, options, ...rest }: any = {}): UseQueryResult<any> => {
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
