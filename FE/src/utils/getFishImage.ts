function getFishImage(className: string): any | undefined {
  switch (className.toLowerCase()) {
    case "black_sea_bream":
      return require("../assets/images/fish/black_sea_bream.png");
    case "cod":
      return require("../assets/images/fish/cod.png");
    case "crab":
      return require("../assets/images/fish/crab.png");
    case "cutlassfish":
      return require("../assets/images/fish/cutlassfish.png");
    case "filefish":
      return require("../assets/images/fish/filefish.png");
    case "olive_flounder":
      return require("../assets/images/fish/olive_flounder.png");
    case "korean_rockfish":
      return require("../assets/images/fish/korean_rockfish.png");
    case "mackerel":
      return require("../assets/images/fish/mackerel.png");
    case "marbled_sole":
      return require("../assets/images/fish/marbled_sole.png");
    case "octopus":
      return require("../assets/images/fish/octopus.png");
    case "striped_beakfish":
      return require("../assets/images/fish/striped_beakfish.png");
    case "red_sea_bream":
      return require("../assets/images/fish/red_sea_bream.png");
    case "baby_octopus":
      return require("../assets/images/fish/baby_octopus.png");
    case "snow_crab":
      return require("../assets/images/fish/snow_crab.png");
    case "squid":
      return require("../assets/images/fish/squid.png");
    case "tilefish":
      return require("../assets/images/fish/tilefish.png");
    case "webfoot_octopus":
      return require("../assets/images/fish/webfoot_octopus.png");
    case "largescale_blackfish":
      return require("../assets/images/fish/largescale_blackfish.png");
    case "bigfin_reef_squid":
      return require("../assets/images/fish/bigfin_reef_squid.png");
    case "scorpionfish":
      return require("../assets/images/fish/scorpionfish.png");
    case "marbled_rockfish":
      return require("../assets/images/fish/marbled_rockfish.png");
    case "japanese_jack_mackerel":
      return require("../assets/images/fish/japanese_jack_mackerel.png");
    case "japanese_amberjack":
      return require("../assets/images/fish/japanese_amberjack.png");
    case "japanese_seabass":
      return require("../assets/images/fish/japanese_seabass.png");
    default:
      return undefined;
  }
}

export default getFishImage;
