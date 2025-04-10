import type { ImageSourcePropType } from "react-native";

export type MainStackParams = {
  Main: undefined;
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
