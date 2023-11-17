import { get, filter, map, isEqual } from "lodash";

export const joinUser = (array1: Array<any>, array2: Array<any>) => {
  const checkUsername = (username: string) => {
    return get(
      filter(array2, (item: any) => isEqual(item?.username, username)),
      "[0]",
      {}
    );
  };

  return map(array1, (item) => {
    const result = checkUsername(item?.username);

    return { ...item, author: { ...result } };
  });
};
