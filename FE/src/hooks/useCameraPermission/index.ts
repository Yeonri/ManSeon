import { useState, useEffect } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

function isAuthorized(status: CameraPermissionStatus): boolean {
  return status === ("granted" as CameraPermissionStatus);
}

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(function checkCameraPermission() {
    async function getPermissionStatus() {
      const currentStatus = await Camera.getCameraPermissionStatus();
      //   console.log("[카메라 권한] 현재 상태:", currentStatus);

      if (isAuthorized(currentStatus)) {
        // console.log("[카메라 권한] 이미 허용됨");
        setHasPermission(true);
        return;
      }

      //   console.log("[카메라 권한] 권한 요청 중...");
      const requestedStatus = await Camera.requestCameraPermission();
      //   console.log("[카메라 권한] 요청 후 상태:", requestedStatus);

      const updatedStatus = await Camera.getCameraPermissionStatus();
      //   console.log("[카메라 권한] 요청 이후 다시 확인한 상태:", updatedStatus);

      const isAllowed = isAuthorized(updatedStatus);
      //   console.log("[카메라 권한] 최종 판단 결과:", isAllowed);
      setHasPermission(isAllowed);
    }

    getPermissionStatus();
  }, []);

  return hasPermission;
}
