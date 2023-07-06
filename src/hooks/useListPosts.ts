import { useState, useEffect } from "react";
import { filterPosts } from "../assets/fake-data/Posts";

import { useDispatch, useSelector } from "react-redux";
import { postsRequest, postsSucess, refreshPosts } from "../store/listPostsSlice";
import { RootState } from "../store/store";

function useListPost(seeMoreIsInViewport: boolean) {
  const dispatch = useDispatch();
  const [limitListPosts, setLimitListPosts] = useState<number>(1);
  const listPosts = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(refreshPosts());
  }, []);

  useEffect(() => {
    if (seeMoreIsInViewport) {
      setLimitListPosts((prev) => prev + 1);
      const getPostFilterApi = async () => {
        dispatch(postsRequest());
        const listPostFilter = await filterPosts(limitListPosts);
        dispatch(postsSucess(listPostFilter));
      };

      getPostFilterApi();
    }
  }, [seeMoreIsInViewport]);

  return listPosts;

  // useEffect(() => {}, [limitListPosts]);
}

export default useListPost;
