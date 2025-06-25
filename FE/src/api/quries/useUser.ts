import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "../user";

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserById(id),
    enabled: !!id,
  });
};
