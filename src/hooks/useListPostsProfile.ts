import { useEffect } from "react";
import { Post, getPostsWithName } from "../assets/fake-data/Posts";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { postsRequest, postsSucess, refreshPosts } from "../store/listPostsSlice";

function useListPostProfile(username: string = "") {
  const dispatch = useDispatch();
  const listPosts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(refreshPosts());
    const fetchApi = async () => {
      dispatch(postsRequest());
      const res: Post[] = await getPostsWithName(username);

      dispatch(postsSucess(res));
    };
    fetchApi();
  }, [username]);

  return listPosts;
}

export default useListPostProfile;
