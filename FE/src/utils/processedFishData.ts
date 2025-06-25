import collection from "../mocks/collectionMocks.json";
import imageMap from "./imageMap";

const processedFishData = collection.map((fish) => {
  const filename = fish.image.split("/").pop();
  return {
    ...fish,
    image: imageMap[filename as string],
  };
});

export default processedFishData;
