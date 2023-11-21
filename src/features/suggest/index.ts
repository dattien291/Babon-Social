import suggestServices from "@/services/suggestServices";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";

export const getSuggestQueryConfig = ({ page = undefined, limit = undefined, options = {}, queryKey = {}, ...rest } = {}) => {
  const params = {
    page,
    limit,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/suggest", { ...originalParams, ...queryKey }],
    queryFn: () => suggestServices.getSuggest(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useSuggestQuery = ({ page, limit, options, ...rest }: any = {}): UseQueryResult<any> => {
  return useQuery(
    getSuggestQueryConfig({
      page,
      limit,
      options,
      ...rest,
    })
  );
};
