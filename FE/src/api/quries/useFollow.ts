import { useMutation, useQuery } from "@tanstack/react-query";
import {
    followUser,
    getMyFollowerList,
    getMyFollowingList,
    unfollowUser,
} from "../follow";

// 팔로우
export const useFollow = () =>
  useMutation({
    mutationFn: (userId: number) => followUser(userId),
  });

// 언팔로우
export const useUnfollow = () =>
  useMutation({
    mutationFn: (userId: number) => unfollowUser(userId),
  });

// 팔로잉 목록
export const useMyFollowingList = () =>
  useQuery({
    queryKey: ["myFollowingList"],
    queryFn: getMyFollowingList,
  });

// 팔로워 목록
export const useMyFollowerList = () =>
  useQuery({
    queryKey: ["myFollowerList"],
    queryFn: getMyFollowerList,
  });
