import { useQuery } from "@tanstack/react-query";
import { getFishes } from "../fishes";

export function useMyFishes() {
  return useQuery({
    queryKey: ["myFishes"],
    queryFn: getFishes,
  });
}
