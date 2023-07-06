import like from "../images/newsfeed/like.gif";
import love from "../images/newsfeed/love.gif";
import care from "../images/newsfeed/care.gif";
import haha from "../images/newsfeed/haha.gif";
import wow from "../images/newsfeed/wow.gif";
import sad from "../images/newsfeed/sad.gif";
import angry from "../images/newsfeed/angry.gif";

import iconlike from "../images/newsfeed/like.svg";
import iconlove from "../images/newsfeed/love.svg";
import iconcare from "../images/newsfeed/care.svg";
import iconhaha from "../images/newsfeed/haha.svg";
import iconwow from "../images/newsfeed/wow.svg";
import iconsad from "../images/newsfeed/sad.svg";
import iconangry from "../images/newsfeed/angry.svg";

export interface Emoji {
  id: string;
  img: string;
  icon: string;
}

export interface EmojiChat {
  id: string;
  icon: string;
}

const listEmoji: Emoji[] = [
  { id: "1", img: like, icon: iconlike },
  { id: "2", img: love, icon: iconlove },
  { id: "3", img: care, icon: iconcare },
  { id: "4", img: haha, icon: iconhaha },
  { id: "5", img: wow, icon: iconwow },
  { id: "6", img: sad, icon: iconsad },
  { id: "7", img: angry, icon: iconangry },
];

export const listEmojiChat: EmojiChat[] = [
  { id: "1", icon: "😀" },
  { id: "2", icon: "😄" },
  { id: "3", icon: "😁" },
  { id: "4", icon: "😆" },
  { id: "5", icon: "😅" },
  { id: "6", icon: "🤣" },
  { id: "7", icon: "😂" },
  { id: "9", icon: "🙂" },
  { id: "10", icon: "🙃" },
  { id: "11", icon: "🫠" },
  { id: "12", icon: "😉" },
  { id: "13", icon: "😊" },
  { id: "14", icon: "😇" },
  { id: "16", icon: "🥰" },
  { id: "17", icon: "😍" },
  { id: "18", icon: "🤩" },
  { id: "19", icon: "😘" },
  { id: "20", icon: "😗" },
  { id: "21", icon: "😚" },
  { id: "22", icon: "😙" },
  { id: "23", icon: "🥲" },
  { id: "24", icon: "😋" },
  { id: "25", icon: "😛" },
  { id: "26", icon: "😜" },
  { id: "27", icon: "🤪" },
  { id: "28", icon: "😝" },
  { id: "29", icon: "🤑" },
  { id: "30", icon: "🤗" },
  { id: "31", icon: "🤭" },
  { id: "32", icon: "🫢" },
  { id: "33", icon: "🫣" },
  { id: "34", icon: "🤫" },
  { id: "35", icon: "🤔" },
  { id: "36", icon: "🫡" },
  { id: "37", icon: "🤐" },
  { id: "38", icon: "🤨" },
  { id: "39", icon: "😐" },
  { id: "40", icon: "😑" },
];

export default listEmoji;
