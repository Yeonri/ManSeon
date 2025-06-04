import { useEffect, useState } from "react";
import {
    check,
    Permission,
    PermissionStatus,
    request,
    RESULTS,
} from "react-native-permissions";
import { Camera } from "react-native-vision-camera";
import { PermissionAlert } from "../utils/permissionAlert";

type PermissionType = Permission | "vision-camera";

// 권한이 부여되었는지 확인하는 함수
function isAuthorized(status: PermissionStatus | string): boolean {
  return (
    status === RESULTS.GRANTED ||
    // 카메라 권한 (vision-camera) 
    status === "granted" ||
    status === "authorized"
  );
}

function usePermission(name: string, permissionType: PermissionType) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPermission() {
      try {
        // 카메라 권한 확인
        if (permissionType === "vision-camera") {
          const currentStatus = await Camera.getCameraPermissionStatus();
          console.log(`[${name} 권한] 현재:`, currentStatus);

          // 권한이 허용된 상태인 경우 권한 여부를 true로 변경
          if (isAuthorized(currentStatus)) {
            console.log(`[${name} 권한] 허용됨`);
            setHasPermission(true);
            return;
          }

          // 권한을 요청한 후 상태 확인
          const requestedStatus = await Camera.requestCameraPermission();
          console.log(`[${name} 권한] 요청 후:`, requestedStatus);

          // 권한 거절 시 설정창 이동을 유도
          if (!isAuthorized(requestedStatus)) {
            console.log(`[${name} 권한] 거절됨 => 설정으로 이동`);
            PermissionAlert(name);
            setHasPermission(false);
            return;
          }
          setHasPermission(isAuthorized(requestedStatus));
        } else {
          // 일반 권한 확인
          const currentStatus = await check(permissionType);
          console.log(`[${name} 권한] 현재:`, currentStatus);

          // 권한이 허용된 상태인 경우 권한 여부를 true로 변경
          if (isAuthorized(currentStatus)) {
            console.log(`[${name} 권한] 허용됨`);
            setHasPermission(true);
            return;
          }

          // 권한을 요청한 후 상태 확인
          const requestedStatus = await request(permissionType);
          console.log(`[${name} 권한] 요청 후:`, requestedStatus);

          // BLOCKED면 설정창 이동을 유도
          if (!isAuthorized(requestedStatus)) {
            console.log(`[${name} 권한] 거절됨 => 설정으로 이동`);
            PermissionAlert(name);
            setHasPermission(false);
            return;
          }

          // 결과 변경
          setHasPermission(isAuthorized(requestedStatus));
        }
      } catch (error) {
        console.log(`[${name} 권한] 에러 발생:`, error);
        setHasPermission(false);
      }
    }
    getPermission();
  }, [name, permissionType]);

  return hasPermission;
}

export default usePermission;
