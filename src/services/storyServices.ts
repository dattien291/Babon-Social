import { publicRequest } from "../request";

const storyServices = {
  getStories: ({ username, page, limit }: any) => {
    return publicRequest.request({
      method: "GET",
      url: "/stories",
      params: { username, page, limit },
    });
  },
};

export default storyServices;
