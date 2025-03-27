import { ParamListBase } from "@react-navigation/native";

export type CommunityStackParams = {
  Community: undefined;
  Post: { postId: number };
  AddPost: undefined;
  EditPost: {
    postId: number;
    title: string;
    content: string;
    postImg: string;
  };
} & ParamListBase;
