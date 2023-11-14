import { filter, get, isEmpty, isEqual } from "lodash";
import { v4 as uuid } from "uuid";

let USERS: any = [
  {
    id: uuid(),
    name: "Hieu",
    username: "hieu123",
    password: "123456",
    avatar: "https://i.pinimg.com/564x/cb/7e/c1/cb7ec19b434a10a0c8d5641fec0f00a1.jpg",
    bio: "Hi I'm Hieu",
    friends: [
      { username: "emily", avatar: "/avataremmy.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    password: "123456",
    avatar: "/hoaemi.jpg",
    bio: "💚 Hi, I'm HoaEmi 💚",
    coverPicture: "https://i.pinimg.com/564x/e8/2d/c7/e82dc7c82cc5dec0145a2fa8cf21eff4.jpg",
    friends: [
      { username: "emily", avatar: "/avataremmy.jpg" },
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Emily",
    username: "emily",
    password: "123456",
    avatar: "/avataremmy.jpg",
    bio: "🍉🍉 Hi, I'm Emily",
    coverPicture: "/coverimageprofile2.jpg",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "𝙏𝙧𝙉𝙜𝙪𝙮𝙚𝙣𝘼𝙣𝙝𝘿𝙪𝙮",
    username: "anhduy",
    password: "123456",
    avatar: "/avataranhduy.jpg",
    bio: "Hi, I'm 𝙏𝙧𝙉𝙜𝙪𝙮𝙚𝙣𝘼𝙣𝙝𝘿𝙪𝙮 💜",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "sirikakire", avatar: "/shirikane.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Sirikakire",
    username: "sirikakire",
    password: "123456",
    avatar: "/shirikane.jpg",
    bio: "💜 Hi, I'm Sirikakire 💜",
    coverPicture: "/coverimageprofile3.jpg",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Caryln",
    username: "caryln",
    password: "123456",
    avatar: "/caryln.jpg",
    bio: "💙 Don’t let a bad day make you feel like you have a bad life. 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Rudy",
    username: "rudy",
    password: "123456",
    avatar: "/avataranime.jpg",
    bio: "💙 There are days like that, quietly, not sad, not happy, slowly drift… the end of a day.",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "William",
    username: "william",
    password: "123456",
    avatar: "",
    bio: "Hi, I'm William",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Laura",
    username: "laura",
    password: "123456",
    avatar: "/laura.jpg",
    bio: "Hi, I'm Laura",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Felicia",
    username: "felicia",
    password: "123456",
    avatar: "/avatarfalicia.jpg",
    bio: "💙 Learn from yesterday, live for today, hope for tomorrow. The important is to not stop questioning.",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Jacintha",
    username: "jacintha",
    password: "123456",
    avatar: "/avatarjathinca.jpg",
    bio: "Hi, I'm Jacintha 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Isa",
    username: "isa",
    password: "123456",
    avatar: "/avatarisa.jpg",
    bio: "Hi, I'm Isa 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Lucinda",
    username: "lucinda",
    password: "123456",
    avatar: "/lucinda.jpg",
    bio: "Hi, I'm Lucinda 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Marabel",
    username: "marabel",
    password: "123456",
    avatar: "/marabel.jpg",
    bio: "Hi, I'm Marabel 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Lisa",
    username: "lisa",
    password: "123456",
    avatar: "/lisa.jpg",
    bio: "Hi, I'm Lisa 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Serena",
    username: "serena",
    password: "123456",
    avatar: "/serena.jpg",
    bio: "Hi, I'm Serena 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Jen",
    username: "christopher",
    password: "123456",
    avatar: "/hieupost1.jpg",
    bio: "Hi, I'm Jen 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Chae",
    username: "chae",
    password: "123456",
    avatar: "/chae.jpg",
    bio: "Hi, I'm Chae 💕💕",
    friends: [
      { username: "hieu123", avatar: "/avatarhieu123.jpg" },
      { username: "anhduy", avatar: "/avataranhduy.jpg" },
      { username: "emily", avatar: "/avataremmy.jpg" },
    ],
  },
];

export const authServices = {
  clientLogin: ({ username, password }: { username: string; password: string }) => {
    return new Promise<any>((resolve) => {
      const response = filter(USERS, (user) => user?.username === username && user?.password === password);

      if (!isEmpty(response)) {
        resolve({ message: "success", data: get(response, "[0]", []) });
      } else {
        resolve({ message: "The username or password is incorrect", data: null });
      }
    });
  },
};

export const userServices = {
  getUsers: ({ username = "", limit = 1, page = 1 }: { username?: string; limit?: number; page?: number }) => {
    return new Promise<any>((resolve) => {
      if (username) {
        const listFilter = USERS.filter((item: any) => isEqual(item?.username, username));
        if (!isEmpty(listFilter)) resolve(listFilter);
      } else {
        resolve(USERS);
      }
    });
  },
};

// export const register = ({ name, username, password }: { name: string; username: string; password: string }) => {
//   return new Promise<any>((resolve) => {
//     USERS.push({
//       id: uuid(),
//       name,
//       username,
//       password,
//       avatar: "",
//       bio: "",
//       friend: [],
//     });
//     resolve({ message: "success", data: null });
//   });
// };

// export const getUserWithUsername = (username: string) => {
//   return new Promise<any>((resolve) => {
//     const listFilter = USERS.filter((item: any) => item.username === username);
//     resolve(listFilter[0]);
//   });
// };

// export const getAllUsers = () => {
//   return new Promise<any>((resolve) => {
//     resolve(USERS);
//   });
// };

// export const updateAvatar = (id: string, avatar: string) => {
//   return new Promise<boolean>((resolve) => {
//     USERS = USERS.map((item: any) => (item.id === id ? { ...item, avatar } : item));
//     setTimeout(() => {
//       resolve(true);
//     }, 1000);
//   });
// };

// export const updateCoverPicture = (username: string, coverPicture: string) => {
//   return new Promise<boolean>((resolve) => {
//     USERS = USERS.map((item: any) =>
//       item.username === username ? { ...item, coverPicture: { url: coverPicture, blurHash: "" } } : item
//     );
//     setTimeout(() => {
//       resolve(true);
//     }, 1000);
//   });
// };

export default USERS;
