import { ParamListBase } from "@react-navigation/native";

export type FishingStackParams = {
  FishingList: undefined;
  Fishing: { title: string; fishId: number };
} & ParamListBase;
