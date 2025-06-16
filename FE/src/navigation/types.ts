import { ParamListBase } from "@react-navigation/native";
import type { ImageSourcePropType } from "react-native";

export type AuthStackParams = {
  Login: undefined;
  Signup: undefined;
};

export type RootStackParams = {
  BottomTab: {
    screen: "home" | "map" | "camera" | "community" | "setting";
    params?: any;
  };

  Camera: undefined;
  AddRecord: { photoUri: string; fishName: string };
};

export type HomeStackParams = {
  Home: undefined;
  Map: undefined;
  Collection: undefined;
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
  Mypage: undefined;
  Community: undefined;
  PostDetail: { postId: number };
  Chatbot: undefined;
};

export type CommunityStackParams = {
  Community: undefined;
  PostDetail: { postId: number };
  AddPost: undefined;
  EditPost: {
    postId: number;
    title: string;
    content: string;
    postImg: string;
  };
  MyPage: undefined;
  UserPage: { userId: number };
} & ParamListBase;

export type RecordStackParams = {
  Record: undefined;
  RecordDetail: { title: string; fishId: number };
  AddRecord: undefined;
} & ParamListBase;

export type SettingsStackParams = {
  Settings: undefined;
  Mypage: undefined;
  MyInformation: undefined;
  UserPage: undefined;
  Friends: undefined;
  MyPost: undefined;
  Collection: undefined;
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

  Prohibited: undefined;
  FishingRule: undefined;
  Notice: undefined;
  Inquiry: undefined;
  Tutorial: undefined;
};
