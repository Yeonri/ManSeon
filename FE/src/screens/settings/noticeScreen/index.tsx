import {
  FlatList,
  InteractionManager,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../../components/common/header";
import CustomButton from "../../../components/common/customButton";
import { useRef } from "react";
import { Modalize } from "react-native-modalize";
import { useGetNotice } from "../../../api/queries/notice";
import { useLoginStore } from "../../../store/loginStore";
import NoticeList from "../../../components/settings/noticeList";
import NoticeBottomSheet from "../../../components/settings/noticeBottomSheet";

export default function NoticeScreen() {
  const sheetRef = useRef<Modalize>(null);
  const { height } = useWindowDimensions();

  const { user } = useLoginStore();
  const { data } = useGetNotice();

  function handleBottomSheet() {
    InteractionManager.runAfterInteractions(() => {
      sheetRef.current?.open();
    });
  }

  return (
    <>
      <SafeAreaView>
        {/* 헤더 */}
        <Header logo={true} before={true} />

        <ScrollView>
          <View className="mx-5 gap-10">
            {/* 공지사항 정보 설명 */}
            <View>
              <Text className="text-neutral-800 text-lg font-bold">
                공지사항
              </Text>
              <Text className="text-neutral-600 text-sm">
                업데이트 및 버그 수정 등을 확인해보세요
              </Text>
            </View>

            {user?.role === "ADMIN" && (
              <>
                <CustomButton
                  fill={true}
                  full={true}
                  title="공지사항 작성"
                  onPress={handleBottomSheet}
                />
              </>
            )}

            {/* 공지사항 */}
            {data && (
              <FlatList
                data={data}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <View className={index === data.length ? "" : "pb-3"}>
                    <NoticeList
                      noticeId={item.notificationId}
                      title={item.title}
                    />
                  </View>
                )}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <NoticeBottomSheet height={height} sheetRef={sheetRef} />
    </>
  );
}
