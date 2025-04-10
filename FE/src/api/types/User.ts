export type User = {
  id: number;
  email: string;
  username: string;
  nickname: string;
  phoneNum: string;
  fishCollections: { [key: number]: number[] };
  profileImg: string;
  followingCount: number;
  followerCount: number;
};
