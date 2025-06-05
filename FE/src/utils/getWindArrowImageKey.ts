import { windArrowImageMap } from "./imageMaps";

const getWindArrowImageKey = (dir: string): keyof typeof windArrowImageMap => {
  return (
    dir in windArrowImageMap ? dir : "북"
  ) as keyof typeof windArrowImageMap;
};

export default getWindArrowImageKey;
