import joinAvatar from "../../utils/JoinAvatar";
import listUser from "./User";

const ListStoriesDefault: any = [
  {
    id: "1",
    name: "Caryln",
    username: "caryln",
    image: [{ url: "/picstory.jpg", blurHash: "LOCh:J%3IUxb^-%3M_kCK8s;jXWr" }],
    audio: "/lofichill6.mp3",
    confirmSeen: false,
  },
  {
    id: "2",
    name: "Rudy",
    username: "rudy",
    image: [{ url: "/lofichill4.jpg", blurHash: "LHBy%krrR.xHK-s:$%og1FJ,WVOD" }],
    audio: "/lofichill3.mp3",
    confirmSeen: false,
  },
  {
    id: "3",
    name: "Sirikarire",
    username: "sirikakire",
    image: [{ url: "/chill1.jpg", blurHash: "L03IVB4.f+IUACnP-pMy?bD%tRRk" }],
    video: "/videosiri.mp4",
    confirmSeen: false,
  },
  {
    id: "4",
    name: "Serena",
    username: "serena",
    image: [{ url: "/coverstory.jpg", blurHash: "LIINzK?dEk$$X-t5x]Io0gR*%2WB" }],
    audio: "/lofichill.mp3",
    confirmSeen: false,
  },
  {
    id: "5",
    name: "Lisa",
    username: "lisa",
    image: [{ url: "/coverstory1.jpg", blurHash: "L99@IxD*4nxu~UD*RktRoaM|ogt7" }],
    video: "/lofichill5.mp4",
    confirmSeen: false,
  },
  {
    id: "6",
    name: "Hieu",
    username: "hieu123",
    image: [{ url: "/coverstoryhieu.jpg", blurHash: "LPCs8MRPtRNb~pV@xao2NcbHsnoe" }],
    video: "/storyhieu.mp4",
    confirmSeen: false,
  },

  {
    id: "7",
    name: "Jen",
    username: "christopher",
    image: [{ url: "/jenstory.jpg", blurHash: "LcHTjj%0WA-V}@J6EespxDodkCaf" }],
    audio: "/storyaudio.mp3",
    confirmSeen: false,
  },
  {
    id: "8",
    name: "Chae",
    username: "chae",
    image: [{ url: "/chaestory.jpg", blurHash: "LACi,X~W0hIU004:Mw%MxVxD?FV@" }],
    audio: "/soryaudio.mp3",
    confirmSeen: false,
  },
  {
    id: "9",
    name: "Laura",
    username: "laura",
    image: [{ url: "/coverlaurastory.jpg" }],
    video: "/laurastory.mp4",
    confirmSeen: false,
  },
  {
    id: "10",
    name: "William",
    username: "william",
    image: [{ url: "/covervideostory.jpg" }],
    video: "/videostory.mp4",
    confirmSeen: false,
  },
  {
    id: "11",
    name: "Hieu",
    username: "hieu123",
    image: [{ url: "/coverlaurastory1.jpg" }],
    video: "/laurastory1.mp4",
    confirmSeen: false,
  },
  {
    id: "12",
    name: "Emily",
    username: "emily",
    image: [{ url: "/chill.jpg", blurHash: "L9Ac-#9Gt7xu~pIBa}xuWXWCaeaz" }],
    audio: "/lofichill3.mp3",
    confirmSeen: false,
  },
  {
    id: "13",
    name: "Caryln",
    username: "caryln",
    image: [{ url: "/coverstorycarlyn.jpg", blurHash: "LbFs0:WAs:Rj_4M{j[ayIVRjRkof" }],
    video: "/storycarlyn.mp4",
    confirmSeen: false,
  },
];

const ListStories: any = joinAvatar(ListStoriesDefault, listUser);

export const getStories = () => {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(ListStories);
    }, 1000);
  });
};

export default ListStories;
