import joinAvatar from "../../utils/JoinAvatar";
import listUser from "../fake-data/User";

export interface Picture {
  url: string;
  blurHash?: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  image: string;
  createAt: string;
  avatar?: string;
  reply?: Comment[];
}

export interface Post {
  id: string;
  username: string;
  name: string;
  text: string;
  like: boolean;
  image: Picture[];
  createAt: string;
  video?: string[];
  comment?: Comment[];
  avatar?: string;
  likeCount: number;
}
const postDefault: Post[] = [
  {
    id: "df14",
    name: "Emily",
    username: "emily",
    text: "Don't miss the wonderful moments with your loved ones at Bistecca restaurant and enjoy the night sky lit up by the Danang International Fireworks Festival 2023! Whether you choose indoor or outdoor tables, we're sure you'll have unforgettable moments! Reserve your table today and immerse yourself in the festive season at Bistecca restaurant with spectacular fireworks performances! 😍😍😍",
    like: false,
    image: [
      { url: "/party1.jpg", blurHash: "L45#|*$*00E0%jt9H;M_56Si-TxB" },
      { url: "/party2.jpg", blurHash: "LpMQ-Ht6~qoz%MoLRjbH%gNGxtt6" },
      { url: "/party3.jpg", blurHash: "LRG[pL~WS%E2t7NHS$M{W?M_Rjt7" },
      { url: "/party4.jpg", blurHash: "LBGI4N009u4.w]~W4o-;9s?b%MD%" },
      { url: "/party5.jpg", blurHash: "L5Gu8p00~2?I9DOG01?b16={4;i]" },
    ],
    createAt: "29 May 2023",
    comment: [
      { id: "cm1", user: "Sirikakire", text: "Hi hi 😛", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      {
        id: "cm2",
        user: "Sirikakire",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        image: "",
        createAt: "29 May 2023",
        avatar: "/shirikane.jpg",
        reply: [
          {
            id: "rl1",
            user: "Sirikakire",
            text: "Reply Comment😥😥",
            image: "",
            createAt: "29 May 2023",
            avatar: "/shirikane.jpg",
          },
          {
            id: "rl2",
            user: "Hieu",
            text: "Hihi😥😥",
            image: "",
            createAt: "29 May 2023",
            avatar: "/avatarhieu123.jpg",
          },
        ],
      },
      { id: "cm3", user: "Sirikakire", text: "Sad....😥😥", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: "cm4", user: "Sirikakire", text: "Test Comment1 kkkk", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      {
        id: "cm5",
        user: "Sirikakire",
        text: "Don’t cry because it’s over, smile because it happened",
        image: "",
        createAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      {
        id: "cm6",
        user: "Sirikakire",
        text: " I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best",
        image: "",
        createAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      { id: "cm7", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: "cm8", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: "cm9", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: "cm10", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
      { id: "cm11", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
    ],
    likeCount: 123,
  },
  {
    id: "df15",
    name: "𝙏𝙧𝙉𝙜𝙪𝙮𝙚𝙣𝘼𝙣𝙝𝘿𝙪𝙮",
    username: "anhduy",
    text: "🥰Hẹn em lần yêu thứ 2 #musicchill #NhạcChill #speedsongs #nhacnaychillphet #nhacchill #lofi #henemlanyeuthu2 #xuhuong",
    like: true,
    image: [],
    video: ["/henemolanyeuthu2.mp4"],
    createAt: "29 May 2023",
    comment: [
      {
        id: "cm12",
        user: "Sirikakire",
        text: "Hhihihihi ❣️ 💕 💞 💓 !!!!",
        image: "",
        createAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
      {
        id: "cm13",
        user: "Sirikakire",
        text: "một ngày mệt mỏi...^^ 🥺",
        image: "",
        createAt: "29 May 2023",
        avatar: "/shirikane.jpg",
      },
    ],
    likeCount: 12,
  },
  {
    id: "df16",
    name: "Rudy",
    username: "rudy",
    text: "#ChillMộtChút #ChillMỗiNgày #lofichill1 #StatusTâmTrạng #Letterchill #buồn #music #videolyrics # Everything is arranged by fate",
    like: true,
    image: [
      { url: "/postlofi1.jpg", blurHash: "LA9?%.rXE0M{yGM|t6xG9[wOtRxb" },
      { url: "/postlofi2.jpg", blurHash: "L17wpbTf0L^%00tn?bAu00D$w]E1" },
      { url: "/postlofi3.jpg", blurHash: "LKDbss~0}}={-F-9Ry$jDhNNM}Ri" },
      { url: "/postlofi4.jpg", blurHash: "L76*wP?wIT8^ekacWAWYM^adaybI" },
    ],
    createAt: "29 May 2023",
    comment: [
      { id: "cm14", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
    ],
    likeCount: 53,
  },
  {
    id: "df17",
    name: "Sirikakire",
    username: "sirikakire",
    text: "😢😢#CapCut chắc do em không đủ tốt ..! #chillmộtchút #videotâmtrạngbuồn #tâmtrạng #lofilyrics #phongcảnhbuồn #đemkhuya",
    like: false,
    image: [
      { url: "/siripost.jpg", blurHash: "LBI|2f-$15=Z020+El,.1ixY^d}=" },
      { url: "/siripost1.jpg", blurHash: "LKKlaB}9M{5r%gXSXmr?3EEjRk-T" },
    ],
    createAt: "29 May 2023",
    comment: [
      { id: "cm15", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
    ],
    likeCount: 130,
  },
  {
    id: "df18",
    name: "Emily",
    username: "emily",
    text: "Câu nói bạn cần ngay lúc này? #tamtrang #foryou #lyrics #xuhuong",
    like: false,
    image: [],
    video: ["/postemily.mp4"],
    createAt: "29 May 2023",
    comment: [
      { id: "cm16", user: "Sirikakire", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/shirikane.jpg" },
    ],
    likeCount: 115,
  },
  {
    id: "df19",
    name: "Isa",
    username: "isa",
    text: "🥰🥰Chúc các bạn ngủ ngon#12cunghoangdao#12chomsao#lyrics #nhactamtrangofficial #music #nhacnaychillphet #tamtrang #chillmộtchút #lofichill #nhữngbàihátbuồn #capcup #chill",
    like: false,
    image: [
      { url: "/postlofi.jpg" },
      { url: "/postlofi6.jpg", blurHash: "L87UrAHrDiox.TMwM{bc4mxuxva%" },
      { url: "/postlofi7.jpg", blurHash: "L49s;~w|?59pxf-?RgRf4T~D9Ye+" },
    ],
    createAt: "29 May 2023",
    comment: [{ id: "cm17", user: "Caryln", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 32,
  },
  {
    id: "df20",
    name: "Hieu",
    username: "hieu123",
    text: "#Don’t wait for the perfect moment, take moment and make it perfect 😊😊",
    like: false,
    image: [],
    video: ["/videopost.mp4"],
    createAt: "29 May 2023",
    comment: [{ id: "cm18", user: "Caryln", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 25,
  },
  {
    id: "df21",
    name: "Hieu",
    username: "hieu123",
    text: "Đừng đánh giá người khác qua vẻ bề ngoài. 😉",
    like: false,
    image: [{ url: "/postlofi5.gif", blurHash: "L7A+aH5S}s0}0}EfNZ=y$+=ys9I=" }],
    createAt: "29 May 2023",
    comment: [{ id: "cm19", user: "Caryln", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/caryln.jpg" }],
    likeCount: 23,
  },
  {
    id: "df22",
    name: "Hieu",
    username: "hieu123",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: [
      { url: "/hieupost.jpg", blurHash: "LPKAToiyRjxa_19ZRkW-~Wr?R%WC" },
      { url: "/hieupost1.jpg", blurHash: "LYHBxnE2~qs:~q%MtRxaR*jZaeIU" },
    ],
    createAt: "29 May 2023",
    comment: [{ id: "cm20", user: "Rudy", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 13,
  },
  {
    id: "df23",
    name: "HoaEmi",
    username: "hoaemi",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum provident commodi recusandae, iure necessitatibus doloremque placeat sit, id rem ex similique cumque in saepe quam minima a temporibus fugiat architecto?",
    like: false,
    image: [{ url: "/posthoa.png", blurHash: "LIOD5:R*tmoz00xu?uM__MRjVYWX" }],
    createAt: "29 May 2023",
    comment: [{ id: "cm21", user: "Rudy", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 3,
  },
  {
    id: "df24",
    name: "HoaEmi",
    username: "hoaemi",
    text: "Đừng đánh giá người khác qua vẻ bề ngoài. 😉",
    like: false,
    image: [{ url: "/posthoa1.jpg", blurHash: "LKI4^i~W.800_3ozxuxtIVD%M{xt" }],
    createAt: "29 May 2023",
    comment: [{ id: "cm22", user: "Rudy", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 13,
  },
  {
    id: "df25",
    name: "HoaEmi",
    username: "hoaemi",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: [
      { url: "/avatarbeau.jpg", blurHash: "LKI#J-0hu6.TJ6pIx^VY4nb^9FIn" },
      { url: "/avatarbeau1.jpg", blurHash: "LWH-_qEe-:n*kFghaf$%~CTKkDVr" },
      { url: "/avatarbeau2.jpg", blurHash: "LRH_=KD4tStS~BMx%MT1D%xZr]I[" },
      { url: "/avatarbeau3.jpg", blurHash: "LWKm|K24X:g5-oEkIVI]mlXhv#I[" },
    ],
    createAt: "29 May 2023",
    comment: [{ id: "cm23", user: "Rudy", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 3,
  },
  {
    id: "df26",
    name: "HoaEmi",
    username: "hoaemi",
    text: "I am pretty good about taking breaks. I know when it's time to step aside and chill out...",
    like: false,
    image: [{ url: "/postrend.jpg", blurHash: "LBEx^d00S~IU={~W0KtR9Z_2n%IA" }],
    createAt: "29 May 2023",
    comment: [{ id: "cm24", user: "Rudy", text: "Test Comment", image: "", createAt: "29 May 2023", avatar: "/avataranime.jpg" }],
    likeCount: 23,
  },
];

let posts: Post[] = joinAvatar(postDefault, listUser);

export const filterPosts = (limit: number) => {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve(posts.slice(0, limit));
    }, 1000);
  });
};

export const getPostsWithName = (name: string) => {
  return new Promise<Post[]>((resolve) => {
    setTimeout(() => {
      resolve(posts.filter((item) => item.username === name));
    }, 1000);
  });
};

export const getRandomPosts = () => {
  return new Promise<Post>((resolve) => {
    resolve(posts[posts.length - 1]);
  });
};

export const addNewPost = (image: string[], ...args: any) => {
  return new Promise<Post[]>((resolve) => {
    const [text, username, name, date, avatar] = args;
    const newListImage = image.map((item) => ({ url: item, blurHash: "" }));

    posts.unshift({
      id: (posts.length + 1).toString(),
      name: name,
      username: username,
      text,
      like: false,
      image: newListImage,
      createAt: date,
      avatar,
      likeCount: 0,
    });
    setTimeout(() => {
      resolve(posts);
    }, 1000);
  });
};

export default posts;
