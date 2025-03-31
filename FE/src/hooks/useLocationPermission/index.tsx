import { useEffect, useState } from "react";
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from "react-native-permissions";
import { PermissionAlert } from "../../utils/permissionAlert";

// 권한이 부여되었는지 확인하는 함수
function isAuthorized(status: PermissionStatus): boolean {
  return status === RESULTS.GRANTED;
}

export function useLocationPermission() {
  // 권한 여부를 useState로 관리한다
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // useEffect를 활용한다.
  useEffect(() => {
    // 비동기 함수가 자세한 위치 정보를 가져온다
    async function getLocationPermission() {
      // 현재 권한 타입을 지정한다.
      const permissionType = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      // 현재 권한 상태를 체크한다.
      const currentStatus = await check(permissionType);
      console.log("[위치 권한] 현재:", currentStatus);

      // 만일 허용된 상태라면 권한 여부를 true로 바꾼다.
      if (isAuthorized(currentStatus)) {
        console.log("[위치 권한] 허용됨");
        setHasPermission(true);
        return;
      }

      // 위치 권한을 요청한 후 상태를 체크한다.
      const requestedStatus = await request(permissionType);
      console.log("[위치 권한] 요청 후:", requestedStatus);

      // 만일 상태가 BLOCKED 상태면 설정창 이동을 유도한다.(=>utils에 따로 설정하자)
      if (requestedStatus === "denied") {
        console.log("[위치 권한] BLOCKED => 설정으로 이동");
        PermissionAlert("위치");
        setHasPermission(false);
        return;
      }

      // 위치 권한 결과를 확인한다.
      const isAllowed = isAuthorized(requestedStatus);
      console.log("[위치 권한] 결과:", isAllowed);
      // 권한 여부를 결과로 변경한다.
      setHasPermission(isAllowed);
    }

    getLocationPermission();
  }, []);

  return hasPermission;
}
