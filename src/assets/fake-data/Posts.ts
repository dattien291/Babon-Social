import { isEqual } from "lodash";
import joinAvatar from "@/utils/JoinAvatar";
import USERS from "../fake-data/User";
import { v4 as uuid } from "uuid";

const postDefault: any = [
  {
    id: uuid(),
    name: "Emily",
    username: "emily",
    text: "Don't miss the wonderful moments with your loved ones at Bistecca restaurant and enjoy the night sky lit up by the Danang International Fireworks Festival 2023! Whether you choose indoor or outdoor tables, we're sure you'll have unforgettable moments! Reserve your table today and immerse yourself in the festive season at Bistecca restaurant with spectacular fireworks performances! 😍😍😍",
    like: false,
    image: [
      "https://i.pinimg.com/564x/00/06/79/0006793a7cda12f9b1f935e8f332dbf1.jpg",
      "https://i.pinimg.com/564x/ee/f7/e4/eef7e47de0618d26844e9bf26e48b4ea.jpg",
      "/party3.jpg",
      "/party4.jpg",
      "/party5.jpg",
    ],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [
      { id: uuid(), name: "Sirikakire", text: "Hi hi 😛", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
      {
        id: uuid(),
        name: "Sirikakire",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "",
        createdAt: "29 May 2023",
        avatar: "/shirikane.jpg",
        reply: [
          {
            id: "rl1",
            name: "Sirikakire",
            text: "Reply Comment😥😥",
            image: "",
            createdAt: "29 May 2023",
            avatar: "/shirikane.jpg",
          },
          {
            id: "rl2",
            name: "Hieu",
            text: "Hihi😥😥",
            image: "",
            createdAt: "29 May 2023",
            avatar: "/avatarhieu123.jpg",
          },
        ],
      },
      { id: uuid(), name: "Sirikakire", text: "Sad....😥😥", image: "", createdAt: "29 May 2023" },
      { id: uuid(), name: "Sirikakire", text: "Test Comment1 kkkk", image: "", createdAt: "29 May 2023" },
      {
        id: uuid(),
        name: "Sirikakire",
        text: "Don’t cry because it’s over, smile because it happened",
        image: "",
        createdAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      {
        id: uuid(),
        name: "Sirikakire",
        text: " I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best",
        image: "",
        createdAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      { id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" },
    ],
    likeCount: 123,
  },
  {
    id: uuid(),
    name: "TrNguyenAnhDuy",
    username: "anhduy",
    text: "🥰Hẹn em lần yêu thứ 2 #musicchill #NhạcChill #speedsongs #nhacnaychillphet #nhacchill #lofi #henemlanyeuthu2 #xuhuong",
    like: true,
    image: ["/meow.jpg"],
    // video: ["/henemolanyeuthu2.mp4"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [
      {
        id: uuid(),
        name: "Sirikakire",
        text: "Hhihihihi ❣️ 💕 💞 💓 !!!!",
        image: "",
        createdAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      {
        id: uuid(),
        name: "Sirikakire",
        text: "hahahaaa...^^ 🥺",
        image: "",
        createdAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
    ],
    likeCount: 12,
  },
  {
    id: uuid(),
    name: "Rudy",
    username: "rudy",
    text: "#ChillMộtChút #ChillMỗiNgày #lofichill1 #StatusTâmTrạng #Letterchill #buồn #music #videolyrics # Everything is arranged by fate",
    like: true,
    image: [
      "/postlofi1.jpg",
      "/postlofi2.jpg",
      "/postlofi3.jpg",
      "https://i.pinimg.com/564x/7c/3a/c0/7c3ac05ee9ff4cc370f03f58c1d78261.jpg",
    ],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" }],
    likeCount: 53,
  },
  {
    id: uuid(),
    name: "Sirikakire",
    username: "sirikakire",
    text: "😢😢#CapCut chắc do em không đủ tốt ..! #chillmộtchút #videotâmtrạngbuồn #tâmtrạng #lofilyrics #phongcảnhbuồn #đemkhuya",
    like: false,
    image: ["/siripost.jpg", "https://i.pinimg.com/236x/fa/75/ba/fa75ba0d4106871084d10f14eaedf6a6.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" }],
    likeCount: 130,
  },
  {
    id: uuid(),
    name: "Emily",
    username: "emily",
    text: "Câu nói bạn cần ngay lúc này? #tamtrang #foryou #lyrics #xuhuong",
    like: false,
    image: [],
    video: ["/postemily.mp4"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Sirikakire", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/shirikane.jpg" }],
    likeCount: 115,
  },
  {
    id: uuid(),
    name: "Isa",
    username: "isa",
    text: "🥰🥰Chúc các bạn ngủ ngon#12cunghoangdao#12chomsao#lyrics #nhactamtrangofficial #music #nhacnaychillphet #tamtrang #chillmộtchút #lofichill #nhữngbàihátbuồn #capcup #chill",
    like: false,
    image: [
      "https://i.pinimg.com/564x/65/a2/44/65a24402400f30c565f82ba6c1f20197.jpg",
      "https://i.pinimg.com/564x/88/07/cd/8807cd29905ccf193a829747b18dbe2a.jpg",
      "https://i.pinimg.com/564x/ee/98/ca/ee98ca977359a00244be8e7b01998a72.jpg",
    ],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Caryln", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 32,
  },
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    text: "#Don’t wait for the perfect moment, take moment and make it perfect 😊😊",
    like: false,
    image: [],
    video: ["/videopost.mp4"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Caryln", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 25,
  },
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    text: "Đừng đánh giá người khác qua vẻ bề ngoài. 😉",
    like: false,
    image: ["/postlofi5.gif"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Caryln", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 23,
  },
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: ["/hieupost.jpg", "/hieupost1.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Rudy", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 13,
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum provident commodi recusandae, iure necessitatibus doloremque placeat sit, id rem ex similique cumque in saepe quam minima a temporibus fugiat architecto?",
    like: false,
    image: ["https://i.pinimg.com/736x/29/30/19/293019f1cccdd7e528d44e11388f1e58.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Rudy", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 3,
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    text: "Đừng đánh giá người khác qua vẻ bề ngoài. 😉",
    like: false,
    image: ["https://i.pinimg.com/564x/55/3b/cf/553bcf2ce862e1b9df6036ad16edd417.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Rudy", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 13,
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: ["/avatarbeau.jpg", "/avatarbeau1.jpg", "/avatarbeau2.jpg", "/avatarbeau3.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Rudy", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 3,
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: ["/postrend.jpg"],
    createdAt: String(new Date("2023-05-23").toISOString()),
    comments: [{ id: uuid(), name: "Rudy", text: "Test Comment", image: "", createdAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 23,
  },
];

const posts: any = joinAvatar(postDefault, USERS);

export const postServices = {
  getPosts: ({ username = "", limit = 1, page = 1 }: { limit?: number; username?: string; page?: number }) => {
    const START = limit * (page - 1);
    const END = limit * page;

    return new Promise<any>((resolve) => {
      setTimeout(() => {
        if (username) {
          resolve(posts.filter((item: any) => isEqual(item?.username, username)).slice(START, END));
        } else {
          resolve(posts.slice(START, END));
        }
      }, 1000);
    });
  },
};

export const addNewPost = (image: string[], ...args: any) => {
  return new Promise<any[]>((resolve) => {
    const [text, username, name, date, avatar] = args;
    const newListImage = image.map((item) => ({ url: item, blurHash: "" }));

    posts.unshift({
      id: uuid(),
      name: name,
      username: username,
      text,
      like: false,
      image: newListImage,
      createdAt: date,
      avatar,
      likeCount: 0,
    });
    setTimeout(() => {
      resolve(posts);
    }, 1000);
  });
};

export default posts;
