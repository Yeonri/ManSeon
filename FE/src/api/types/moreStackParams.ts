import type { ImageSourcePropType } from "react-native";

export type MoreStackParams = {
  More: undefined;
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
