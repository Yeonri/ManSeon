import { Recomment } from "./Recomment";

export type Comment = {
  commentId: number;
  postId: number;
  userId: number;
  nickname: string;
  profileImg: string;
  commentContent: string;
  createAt: string;
  RecommentNum: number;
  RecommentList: Recomment[];
};
