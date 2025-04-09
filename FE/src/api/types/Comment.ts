import { Recomment } from "./Recomment";

export type Comment = {
  commentId: number;
  boardId: number;
  userId: number;
  username: string;
  nickname: string;
  profileImg: string;
  commentContent: string;
  createdAt: string;
  RecommentNum: number;
  recomment: Recomment[];
};
