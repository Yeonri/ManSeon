import { weatherImageMap } from "./imageMaps";

const getWeatherImageKey = (
  sky: number,
  precipitationType: number
): keyof typeof weatherImageMap => {
  if (precipitationType !== 0) {
    if ([1, 4, 5, 6].includes(precipitationType)) return "rain";
    if ([2, 3, 7].includes(precipitationType)) return "snow";
  }

  if (sky === 1) return "sunny";
  if (sky === 3) return "cloudy";
  if (sky === 4) return "cloudy2";

  return "sunny"; // 매칭되지 않을 경우 sunny 반환(임시)
};

export default getWeatherImageKey;
