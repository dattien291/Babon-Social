import { privateRequest, publicRequest } from "@/request";

const authServices = {
  clientLogin: ({ username, password }: any) => {
    return publicRequest.request({
      method: "POST",
      url: "/login",
      data: { username, password },
    });
  },

  clientGetMe: () => {
    return privateRequest.request({
      method: "GET",
      url: "/me",
    });
  },
};

export default authServices;
