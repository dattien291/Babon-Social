import { userServices } from "@/assets/fake-data/User";
import { useQuery } from "@tanstack/react-query";
import { pickBy } from "lodash";

export const getUsersQueryConfig = ({ username = "", limit = undefined, page = undefined, options = {}, queryKey = {}, ...rest } = {}) => {
  const params = {
    username,
    limit,
    page,
  };
  const originalParams = pickBy(params, (val) => !!val);

  return {
    queryKey: ["/users", { ...originalParams, ...queryKey }],
    queryFn: () => userServices.getUsers(originalParams),
    options: { retry: 1, ...options },
    ...rest,
  };
};

export const useUsersQuery = ({ username, limit, page, options, ...rest }: any = {}) => {
  return useQuery(
    getUsersQueryConfig({
      username,
      limit,
      options,
      page,
      ...rest,
    })
  );
};
