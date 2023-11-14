import { get, filter, map, isEqual } from "lodash";

const joinAvatar = (array1: Array<any>, array2: Array<any>) => {
  const checkUsername = (username: string) => {
    return get(
      get(
        filter(array2, (item: any) => isEqual(item?.username, username)),
        "[0]"
      ),
      "avatar",
      ""
    );
  };

  return map(array1, (item) => ({ ...item, avatar: checkUsername(item?.username) }));
};

export default joinAvatar;
