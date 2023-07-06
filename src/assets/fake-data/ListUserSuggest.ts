import joinAvatar from "../../utils/JoinAvatar";
import listUser from "./User";

export interface PostTrending {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  bio: string;
}

const listUserSuggestDefault: PostTrending[] = [
  { id: "6", name: "HoaEmi", username: "hoaemi", avatar: "", bio: "Hi, I'm Hoa" },
  { id: "1", name: "Felicia", username: "felicia", avatar: "", bio: "Hi, I'm Felicia" },
  { id: "2", name: "Jacintha", username: "jacintha", avatar: "", bio: "Hi, I'm Jacintha" },
  { id: "3", name: "Isa", username: "isa", avatar: "", bio: "Hi, I'm Isa" },
  { id: "4", name: "Lucinda", username: "lucinda", avatar: "", bio: "Hi, I'm Lucinda" },
  { id: "5", name: "Marabel", username: "marabel", avatar: "", bio: "Hi, I'm Marabel" },
];

let listUserSuggest: PostTrending[] = joinAvatar(listUserSuggestDefault, listUser);

export const getListUserSuggest = () => {
  return new Promise<PostTrending[]>((resolve) => {
    resolve(listUserSuggest);
  });
};

export default listUserSuggest;
