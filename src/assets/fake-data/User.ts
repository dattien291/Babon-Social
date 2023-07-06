import { Picture } from "./Posts";

export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar: string;
  bio: string;
  coverPicture?: Picture;
  friend?: { username: string; avatar: string }[];
}

interface ResponseLogin {
  message: string;
  data: User | null;
}

let listUser: User[] = [
  {
    id: "1",
    name: "Hieu",
    username: "hieu123",
    password: "123456",
    avatar: "/avatarhieu123.jpg",
    bio: "Hi I'm Hieu",
    friend: [
      { username: "emily", avatar: "/avataremmy.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: "2",
    name: "HoaEmi",
    username: "hoaemi",
    password: "123456",
    avatar: "/hoaemi.jpg",
    bio: "💚 Hi, I'm HoaEmi 💚",
    coverPicture: { url: "/coverimageprofile1.png", blurHash: "L8B.fp57Mx}@3DM{R*xt1N;|w^FK" },
    friend: [
      { username: "emily", avatar: "/avataremmy.jpg" },
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: "3",
    name: "Emily",
    username: "emily",
    password: "123456",
    avatar: "/avataremmy.jpg",
    bio: "🍉🍉 Hi, I'm Emily",
    coverPicture: { url: "/coverimageprofile2.jpg", blurHash: "L8Bf690eD$~VPC,nrWFz15awM_t8" },
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: "4",
    name: "𝙏𝙧𝙉𝙜𝙪𝙮𝙚𝙣𝘼𝙣𝙝𝘿𝙪𝙮",
    username: "anhduy",
    password: "123456",
    avatar: "/avataranhduy.jpg",
    bio: "Hi, I'm 𝙏𝙧𝙉𝙜𝙪𝙮𝙚𝙣𝘼𝙣𝙝𝘿𝙪𝙮 💜",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "5",
    name: "Sirikakire",
    username: "sirikakire",
    password: "123456",
    avatar: "/shirikane.jpg",
    bio: "💜 Hi, I'm Sirikakire 💜",
    coverPicture: { url: "/coverimageprofile3.jpg", blurHash: "L8AI}b}q0z0zAbM|$%$*0g9u-U={" },
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "6",
    name: "Caryln",
    username: "caryln",
    password: "123456",
    avatar: "/caryln.jpg",
    bio: "💙 Don’t let a bad day make you feel like you have a bad life. 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "7",
    name: "Rudy",
    username: "rudy",
    password: "123456",
    avatar: "/avataranime.jpg",
    bio: "💙 There are days like that, quietly, not sad, not happy, slowly drift… the end of a day.",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "8",
    name: "William",
    username: "william",
    password: "123456",
    avatar: "",
    bio: "Hi, I'm William",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "9",
    name: "Laura",
    username: "laura",
    password: "123456",
    avatar: "/laura.jpg",
    bio: "Hi, I'm Laura",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "10",
    name: "Felicia",
    username: "felicia",
    password: "123456",
    avatar: "/avatarfalicia.jpg",
    bio: "💙 Learn from yesterday, live for today, hope for tomorrow. The important is to not stop questioning.",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "11",
    name: "Jacintha",
    username: "jacintha",
    password: "123456",
    avatar: "/avatarjathinca.jpg",
    bio: "Hi, I'm Jacintha 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "12",
    name: "Isa",
    username: "isa",
    password: "123456",
    avatar: "/avatarisa.jpg",
    bio: "Hi, I'm Isa 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "13",
    name: "Lucinda",
    username: "lucinda",
    password: "123456",
    avatar: "/lucinda.jpg",
    bio: "Hi, I'm Lucinda 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "13",
    name: "Marabel",
    username: "marabel",
    password: "123456",
    avatar: "/marabel.jpg",
    bio: "Hi, I'm Marabel 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "14",
    name: "Lisa",
    username: "lisa",
    password: "123456",
    avatar: "/lisa.jpg",
    bio: "Hi, I'm Lisa 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "15",
    name: "Serena",
    username: "serena",
    password: "123456",
    avatar: "/serena.jpg",
    bio: "Hi, I'm Serena 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "16",
    name: "Jen",
    username: "christopher",
    password: "123456",
    avatar: "/hieupost1.jpg",
    bio: "Hi, I'm Jen 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: "17",
    name: "Chae",
    username: "chae",
    password: "123456",
    avatar: "/chae.jpg",
    bio: "Hi, I'm Chae 💕💕",
    friend: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
];

export const checkLogin = (username: string, password: string) => {
  return new Promise<ResponseLogin>((resolve) => {
    listUser.forEach((element) => {
      if (element.username === username && element.password === password) {
        resolve({ message: "success", data: element });
      }
    });
    resolve({ message: "The username or password is incorrect", data: null });
  });
};

export const signUpWithGoogle = (name: string, username: string, avatar: string) => {
  return new Promise<boolean>((resolve) => {
    listUser.push({
      id: (listUser.length + 1).toString(),
      name,
      username,
      password: "",
      avatar,
      bio: `Hi, I'm ${name}`,
      friend: [],
    });
    resolve(true);
  });
};

export const signUp = (name: string, username: string, password: string) => {
  return new Promise<ResponseLogin>((resolve) => {
    listUser.push({
      id: (listUser.length + 1).toString(),
      name,
      username,
      password,
      avatar: "",
      bio: `Hi, I'm ${name}`,
      friend: [],
    });
    resolve({ message: "success", data: null });
  });
};

export const getUserWithUsername = (username: string) => {
  return new Promise<User>((resolve) => {
    const listFilter: User[] = listUser.filter((item) => item.username === username);
    resolve(listFilter[0]);
  });
};

export const getAllUsers = () => {
  return new Promise<User[]>((resolve) => {
    resolve(listUser);
  });
};

export const updateAvatar = (id: string, avatar: string) => {
  return new Promise<boolean>((resolve) => {
    listUser = listUser.map((item) => (item.id === id ? { ...item, avatar } : item));
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const updateCoverPicture = (username: string, coverPicture: string) => {
  return new Promise<boolean>((resolve) => {
    listUser = listUser.map((item) =>
      item.username === username ? { ...item, coverPicture: { url: coverPicture, blurHash: "" } } : item
    );
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export default listUser;
