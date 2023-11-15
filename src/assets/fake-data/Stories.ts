import { joinUser } from "@/utils/index";
import USERS from "./User";
import { v4 as uuid } from "uuid";

const STORIES: any = [
  {
    id: uuid(),
    username: "caryln",
    image: "/story1.jpg",
    video: "/meow.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "rudy",
    image: "/story2.jpg",
    video: "/meow1.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "emily",
    image: "/story3.jpg",
    video: "/meow2.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "serena",
    image: "/story4.jpg",
    video: "/meow5.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "lisa",
    image: "/coverstory1.jpg",
    video: "/lofichill5.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "hieu123",
    image: "/coverstoryhieu.jpg",
    video: "/storyhieu.mp4",
    confirmSeen: false,
  },

  {
    id: uuid(),
    username: "christopher",
    image: "/story5.jpg",
    video: "/meow3.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "chae",
    image: "/story6.jpg",
    video: "/meow4.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "laura",
    image: "/coverlaurastory.jpg",
    video: "/laurastory.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "william",
    image: "/covervideostory.jpg",
    video: "/videostory.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "hieu123",
    image: "/coverlaurastory1.jpg",
    video: "/laurastory1.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "emily",
    image: "/chill1.jpg",
    video: "/videosiri.mp4",
    confirmSeen: false,
  },
  {
    id: uuid(),
    username: "caryln",
    image: "/coverstorycarlyn.jpg",
    video: "/storycarlyn.mp4",
    confirmSeen: false,
  },
];

export const storyServices = {
  getStories: ({ username = "", limit = 1, page = 1 }: { limit?: number; username?: string; page?: number }) => {
    return new Promise<any>((resolve) => {
      setTimeout(() => {
        resolve(joinUser(STORIES, USERS));
      }, 1000);
    });
  },
};
