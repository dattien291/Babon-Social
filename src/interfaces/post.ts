export interface IPost {
  id?: string;
  name: string;
  username: string;
  text: string;
  like: boolean;
  image: string[];
  video?: string[];
  createdAt: string;
  comment?: any;
  likeCount: number;
}
