import { useEffect } from "react";
import { Post, getPostsWithName } from "../assets/fake-data/Posts";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { postsRequest, postsSucess, refreshPosts } from "../store/listPostsSlice";

function useListPostProfile(username: string = "") {
  const distpath = useDispatch();
  const listPosts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    distpath(refreshPosts());
    const fetchApi = async () => {
      distpath(postsRequest());
      const res: Post[] = await getPostsWithName(username);

      distpath(postsSucess(res));
    };
    fetchApi();
  }, [username]);

  return listPosts;
}

export default useListPostProfile;
