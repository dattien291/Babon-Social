export interface InfoFriend {
  id: string;
  username: string;
  message: Message[];
}

export interface Message {
  id: string;
  text: string;
  time: string;
  emoji: string;
}

const listFriend: InfoFriend[] = [
  {
    id: "1",
    username: "henry",
    message: [],
  },
  {
    id: "2",
    username: "rudy",
    message: [],
  },
  {
    id: "3",
    username: "sirikakire",
    message: [],
  },
  {
    id: "4",
    username: "lisa",
    message: [],
  },
  {
    id: "5",
    username: "chae",
    message: [],
  },
  {
    id: "6",
    username: "emily",
    message: [],
  },
  {
    id: "7",
    username: "christopher",
    message: [],
  },
  {
    id: "8",
    username: "daniel",
    message: [],
  },
  {
    id: "9",
    username: "brian",
    message: [],
  },
  {
    id: "10",
    username: "laura",
    message: [],
  },
  {
    id: "11",
    username: "william",
    message: [],
  },
];

export default listFriend;
