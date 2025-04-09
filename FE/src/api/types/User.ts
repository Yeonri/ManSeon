export type User = {
  data: {
    id: number;
    email: string;
    username: string;
    nickname: string;
    phoneNum: string;
    fishCollections: [];
    profileImg: string;
    followingCount: number;
    followerCount: number;
  };
};
