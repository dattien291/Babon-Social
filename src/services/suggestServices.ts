import { publicRequest } from "../request";

const suggestServices = {
  getSuggest: ({ page, limit }: any) => {
    return publicRequest.request({
      method: "GET",
      url: "/suggestion",
      params: { page, limit },
    });
  },
};

export default suggestServices;
