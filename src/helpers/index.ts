import { filter, get, isEqual, map } from "lodash";

export const thunkWrapper = async ({ promise, thunkAction, onSuccess = () => null, onError = () => null, onLoading = () => null }: any) => {
  const result = await promise;

  const data = get(result, "payload", {});

  if (thunkAction.fulfilled.match(result)) onSuccess(data);
  if (thunkAction.rejected.match(result)) onError(data);
  if (thunkAction.pending.match(result)) onLoading();

  return data;
};

export const getRoundedCanvas = (sourceCanvas: any) => {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  var width = sourceCanvas.width;
  var height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  if (context) {
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
  }
  return canvas;
};

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
