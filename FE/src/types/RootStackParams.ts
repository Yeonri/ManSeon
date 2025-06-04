export type RootStackParams = {
  BottomTabs: {
    screen: "home" | "map" | "camera" | "community" | "more";
    params?: any;
  };

  Camera: undefined;
  Record: { photoUri: string; fishName: string };
  Chatbot: undefined;
};
