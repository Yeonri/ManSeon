import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addFollowing,
  deleteFollowing,
  getMyFollowers,
  getMyFollowings,
  getOtherFollowers,
  getOtherFollowings,
} from "../follow";

// 내 팔로잉 전체 조회
export function useGetMyFollowings() {
  return useQuery({
    queryKey: ["myFollowings"],
    queryFn: getMyFollowings,
  });
}

// 내 팔로워 전체 조회
export function useGetMyFollowers() {
  return useQuery({
    queryKey: ["myFollowers"],
    queryFn: getMyFollowers,
  });
}

// 다른 유저 팔로잉 전체 조회
export function useGetOtherFollowings(userId: string) {
  return useQuery({
    queryKey: ["otherFollowings", userId],
    queryFn: () => getOtherFollowings(userId),
  });
}

// 다른 유저 팔로워 전체 조회
export function useGetOtherFollowers(userId: string) {
  return useQuery({
    queryKey: ["otherFollowings", userId],
    queryFn: () => getOtherFollowers(userId),
  });
}

// 팔로잉 추가
export function useAddFollowing(userId: string) {
  return useMutation({
    mutationFn: () => addFollowing(userId),
  });
}

// 팔로잉 삭제
export function useDeleteFollowing(userId: string) {
  return useMutation({
    mutationFn: () => deleteFollowing(userId),
  });
}
