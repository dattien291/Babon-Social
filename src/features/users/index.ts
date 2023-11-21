import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";
import userServices from "@/services/userServices";

export const getUserQueryConfig = ({ username = "", options = {}, queryKey = {}, ...rest } = {}) => {
  const params = {
    username,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/users", { ...originalParams, ...queryKey }],
    queryFn: () => userServices.getUser(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useUserQuery = ({ username, options, ...rest }: any = {}): UseQueryResult<any> => {
  return useQuery(
    getUserQueryConfig({
      username,
      options,
      ...rest,
    })
  );
};
