import { get } from "lodash";

export const thunkWrapper = async ({
  promise,
  thunkAction,
  onSuccess = () => null,
  onError = () => null,
  onLoading = () => null,
}: any) => {
  const result = await promise;

  const data = get(result, "payload", {});

  if (thunkAction.fulfilled.match(result)) onSuccess(data);
  if (thunkAction.rejected.match(result)) onError(data);
  if (thunkAction.pending.match(result)) onLoading();

  return data;
};
