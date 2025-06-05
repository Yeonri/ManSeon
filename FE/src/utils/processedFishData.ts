import collection from "../mocks/collectionMocks.json";
import { getFishImage } from "./getImages";

const processedFishData = collection.map((fish) => {
  const filename = fish.image
    .split("/")
    .pop()
    ?.toLowerCase()
    .replace(".png", "");
  return {
    ...fish,
    image: filename ? getFishImage(filename) : undefined,
  };
});

export default processedFishData;
