import { filter, get, isEmpty, isEqual } from "lodash";
import { v4 as uuid } from "uuid";

let USERS: any = [
  {
    id: uuid(),
    name: "Minh Hieu",
    username: "hieu123",
    password: "123456",
    avatar: "https://i.pinimg.com/564x/cb/7e/c1/cb7ec19b434a10a0c8d5641fec0f00a1.jpg",
    bio: "Hi I'm Hieu",
    friends: [
      { username: "emily", avatar: "https://i.pinimg.com/736x/49/bf/fe/49bffe149353fc16e64426463ff2d855.jpg" },
      { username: "sirikakire", avatar: "https://i.pinimg.com/564x/da/9a/46/da9a4641ec05835561fb0486729270af.jpg" },
      { username: "anhduy", avatar: "https://i.pinimg.com/736x/08/78/0c/08780c623015ec01d5fe0364aabfff16.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "HoaEmi",
    username: "hoaemi",
    password: "123456",
    avatar: "https://i.pinimg.com/736x/eb/8f/ef/eb8fef805ac91de7edeb3b9647cb33de.jpg",
    bio: "💚 Hi, I'm HoaEmi 💚",
    coverPicture: "https://i.pinimg.com/564x/e8/2d/c7/e82dc7c82cc5dec0145a2fa8cf21eff4.jpg",
    friends: [
      { username: "emily", avatar: "https://i.pinimg.com/736x/49/bf/fe/49bffe149353fc16e64426463ff2d855.jpg" },
      { username: "hieu123", avatar: "https://i.pinimg.com/564x/cb/7e/c1/cb7ec19b434a10a0c8d5641fec0f00a1.jpg" },
      { username: "anhduy", avatar: "https://i.pinimg.com/736x/08/78/0c/08780c623015ec01d5fe0364aabfff16.jpg" },
    ],
  },
  {
    id: uuid(),
    name: "Emily",
    username: "emily",
    password: "123456",
    avatar: "https://i.pinimg.com/736x/49/bf/fe/49bffe149353fc16e64426463ff2d855.jpg",
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
    name: "TrNguyenAnhDuy",
    username: "anhduy",
    password: "123456",
    avatar: "https://i.pinimg.com/736x/08/78/0c/08780c623015ec01d5fe0364aabfff16.jpg",
    bio: "Hi, I'm TrNguyenAnhDuy 💜",
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
    avatar: "https://i.pinimg.com/564x/da/9a/46/da9a4641ec05835561fb0486729270af.jpg",
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
    avatar: "https://i.pinimg.com/564x/75/03/6a/75036a34bd1f8f3a49037cc1f9290106.jpg",
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
    avatar: "https://i.pinimg.com/564x/f5/9a/74/f59a740cb12b21b32fca3c631eb925c7.jpg",
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
    avatar: "https://i.pinimg.com/736x/c7/a8/e1/c7a8e136163f4d3d4b51d43c5a6dc400.jpg",
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
    avatar: "https://i.pinimg.com/736x/49/6a/dd/496add80b4f57ddeea4a9b9e0daa4c26.jpg",
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
    avatar: "https://i.pinimg.com/736x/ee/72/9e/ee729eda45763146823fc4f440f6f7a6.jpg",
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
    avatar: "https://i.pinimg.com/736x/f5/63/51/f563515b628c16283eb35ae755ff7c2e.jpg",
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
    avatar: "https://i.pinimg.com/736x/89/4a/3f/894a3fa234c94ed92381f748cf5aa039.jpg",
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
    avatar: "https://i.pinimg.com/564x/38/52/d2/3852d25993501a342dc918d4e7eeaad3.jpg",
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
    avatar: "https://i.pinimg.com/564x/f5/63/51/f563515b628c16283eb35ae755ff7c2e.jpg",
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
    avatar: "https://i.pinimg.com/564x/d3/4e/76/d34e76c57d6dfe31b802bd2f7c697160.jpg",
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
    avatar: "https://i.pinimg.com/736x/f4/33/d0/f433d0dcaa1f97bf72646f5daf7e05ee.jpg",
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
    avatar: "https://i.pinimg.com/564x/ce/38/db/ce38db7e58e9f6e8598dddf2d9516fdb.jpg",
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
