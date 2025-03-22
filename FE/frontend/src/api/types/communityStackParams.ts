import { ParamListBase } from "@react-navigation/native";

export type CommunityStackParams = {
  Community: undefined;
  Post: { postId: number };
} & ParamListBase;
