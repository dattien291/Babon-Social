import joinAvatar from "@/utils/JoinAvatar";
import USERS from "./User";
import { v4 as uuid } from "uuid";

const STORIES: any = [
  {
    id: uuid(),
    name: "Caryln",
    username: "caryln",
    image: "/picstory.jpg",
    video: "/meow.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Rudy",
    username: "rudy",
    image: "/lofichill4.jpg",
    video: "/meow1.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Sirikarire",
    username: "sirikakire",
    image: "/chill1.jpg",
    video: "/meow2.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Serena",
    username: "serena",
    image: "/coverstory.jpg",
    video: "/videosiri.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Lisa",
    username: "lisa",
    image: "/coverstory1.jpg",
    video: "/lofichill5.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    image: "/coverstoryhieu.jpg",
    video: "/storyhieu.mp4",
    confirmSeen: false,
  },

  {
    id: uuid(),
    name: "Jen",
    username: "christopher",
    image: "/jenstory.jpg",
    video: "/meow3.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Chae",
    username: "chae",
    image: "/chaestory.jpg",
    video: "/videosiri.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Laura",
    username: "laura",
    image: "/coverlaurastory.jpg",
    video: "/laurastory.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "William",
    username: "william",
    image: "/covervideostory.jpg",
    video: "/videostory.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    image: "/coverlaurastory1.jpg",
    video: "/laurastory1.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Emily",
    username: "emily",
    image: "/chill.jpg",
    video: "/videosiri.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    name: "Caryln",
    username: "caryln",
    image: "/coverstorycarlyn.jpg",
    video: "/storycarlyn.mp4",
    confirmSeen: false,
  },
];

export const getStories = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(joinAvatar(STORIES, USERS));
    }, 1000);
  });
};
