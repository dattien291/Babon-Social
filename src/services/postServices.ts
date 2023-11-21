import { publicRequest } from "../request";

const postServices = {
  getPosts: ({ username, page, limit }: any) => {
    return publicRequest.request({
      method: "GET",
      url: "/posts",
      params: { username, page, limit },
    });
  },
};

export default postServices;
