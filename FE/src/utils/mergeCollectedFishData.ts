type Fish = {
  id: number;
  name: string;
  description: string;
  image: string;
  is_collected: boolean;
  collection_info: {
    latitude: number;
    longitude: number;
    caught_at: string;
  }[];
};

type CollectedFish = {
  fishId: number;
  fishName: string;
  size: number;
  bait: string;
  equipment: string;
  fishImg: string;
  lat: number;
  lng: number;
  createdAt: string;
};

function mergeCollectedFishData(
  baseList: Fish[],
  collected: CollectedFish[]
): Fish[] {
  // 이름 기준으로 그룹화
  const groupedByName = collected.reduce(
    (acc, item) => {
      const name = item.fishName;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name].push({
        latitude: item.lat,
        longitude: item.lng,
        caught_at: item.createdAt.slice(0, 10),
      });
      return acc;
    },
    {} as Record<string, Fish["collection_info"]>
  );

  return baseList.map((fish) => {
    if (groupedByName[fish.name]) {
      return {
        ...fish,
        is_collected: true,
        collection_info: groupedByName[fish.name],
      };
    } else {
      return fish;
    }
  });
}

export default mergeCollectedFishData