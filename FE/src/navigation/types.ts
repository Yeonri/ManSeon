import { ParamListBase } from "@react-navigation/native";
import type { ImageSourcePropType } from "react-native";

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type SignupStackParams = {
  Name: undefined;
  PhoneNum: { name: string };
  Email: { name: string; phone: string };
  Password: { name: string; phone: string; email: string };
  Nickname: { name: string; phone: string; email: string; password: string };
};

export type AppStackParams = {
  BottomTab: {
    screen: "home" | "map" | "camera" | "community" | "setting";
    params?: any;
  };

  Camera: undefined;
  Record: { photoUri: string; fishName: string };
  Chatbot: undefined;
};

export type HomeStackParams = {
  Home: undefined;
  Map: undefined;
  Community: undefined;
  CollectionList: undefined;
  CollectionDetail: {
    name: string;
    description: string;
    image: ImageSourcePropType;
    collection_info: {
      location_name: string;
      latitude: number;
      longitude: number;
      caught_at: string;
    }[];
  };
  Profile: undefined;
  Chatbot: undefined;
  Post: { postId: number };
};

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
  Profile: undefined;
  UserProfile: { userId: number };
} & ParamListBase;

export type FishingStackParams = {
  FishingList: undefined;
  Fishing: { title: string; fishId: number };
} & ParamListBase;

export type SettingStackParams = {
  Setting: undefined;
  Tutorial: undefined;
  Prohibited: undefined;
  Rule: undefined;
  MyPosts: undefined;
  Fishings: undefined;
  CollectionList: undefined;
  CollectionDetail: {
    name: string;
    description: string;
    image: ImageSourcePropType;
    collection_info: {
      latitude: number;
      longitude: number;
      caught_at: string;
    }[];
  };
  Suggestions: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  Friends: undefined;
};
