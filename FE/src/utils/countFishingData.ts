interface FishCatchRaw {
  fishId: number;
  fishName: string;
  size: number;
  bait: string;
  equipment: string;
  fishImg: string;
  lat: number;
  lng: number;
  createdAt: string;
}

interface FishingList {
  name: string;
  count: number;
}

interface FishingStats {
  fishing_total: number;
  fishing_list: FishingList[];
}

function countFishingData(fishingData: FishCatchRaw[]): FishingStats {
  if (!fishingData || fishingData.length === 0)
    return {
      fishing_total: 0,
      fishing_list: [],
    };

  // 물고기별로 낚은 횟수 세기
  const fishCount = fishingData.reduce(
    (acc, item) => {
      if (!acc[item.fishName]) {
        acc[item.fishName] = 0;
      }
      acc[item.fishName] += 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // 총 낚시 횟수 계산
  const fishing_total = fishingData.length;

  // 낚은 물고기 리스트 생성
  const fishing_list = Object.entries(fishCount).map(([name, count]) => ({
    name,
    count,
  }));

  return {
    fishing_total,
    fishing_list,
  };
}

export default countFishingData;
