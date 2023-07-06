const joinAvatar = (array1: Array<any>, array2: Array<any>) => {
  const checkUsername = (username: string) => {
    for (let index in array2) {
      if (array2[index].username === username) {
        return array2[index].avatar;
      }
    }
    return "";
  };

  let newPost = array1.map((post) => ({ ...post, avatar: checkUsername(post.username) }));

  return newPost;
};

export default joinAvatar;
