import { ReactNode, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { getMyInfo } from "../../../api/user";
import { useUserStore } from "../../../store/userStore";

interface Props {
  children: ReactNode;
}

export function UserInitializer({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMyInfo();
        console.log("유저 정보 불러오기 성공:", user);
        setUser(user);
      } catch (error) {
        console.log("유저 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
