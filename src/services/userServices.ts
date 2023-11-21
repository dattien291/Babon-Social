import { publicRequest } from "../request";

const userServices = {
  getUser: ({ username }: any) => {
    return publicRequest.request({
      method: "GET",
      url: `/users/${username}`,
    });
  },
};

export default userServices;
