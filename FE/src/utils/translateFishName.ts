const fishNameMap: Record<string, string> = {
  black_sea_bream: "감성돔",
  cod: "대구",
  crab: "게",
  cutlassfish: "갈치",
  filefish: "쥐치",
  olive_flounder: "광어",
  korean_rockfish: "우럭",
  mackerel: "고등어",
  marbled_sole: "줄가자미",
  octopus: "문어",
  striped_beakfish: "돌돔",
  red_sea_bream: "참돔",
  baby_octopus: "주꾸미",
  snow_crab: "대게",
  squid: "오징어",
  tilefish: "옥돔",
  webfoot_octopus: "낙지",
  largescale_blackfish: "벵에돔",
  bigfin_reef_squid: "무늬오징어",
  scorpionfish: "쏨뱅이",
  Marbled_rockfish: "볼락",
  Japanese_jack_mackerel: "전갱이",
  Japanese_amberjack: "방어",
  Japanese_seabass: "농어",
};

function translateFishName(eng: string): string {
  return fishNameMap[eng] || "알 수 없음";
}

export default translateFishName;
