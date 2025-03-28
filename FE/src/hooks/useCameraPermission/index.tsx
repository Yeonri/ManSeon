import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

function isAuthorized(status: CameraPermissionStatus): boolean {
  return status === ("granted" as CameraPermissionStatus);
}

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPermissionStatus() {
      const currentStatus = await Camera.getCameraPermissionStatus();
      console.log("[카메라 권한] 현재:", currentStatus);

      if (isAuthorized(currentStatus)) {
        console.log("[카메라 권한] 허용");
        setHasPermission(true);
        return;
      }

      const requestedStatus = await Camera.requestCameraPermission();
      console.log("[카메라 권한] 요청 후:", requestedStatus);

      const updatedStatus = await Camera.getCameraPermissionStatus();
      console.log("[카메라 권한] 요청 후 다시 확인:", updatedStatus);

      const isAllowed = isAuthorized(updatedStatus);
      console.log("[카메라 권한] 결과:", isAllowed);
      setHasPermission(isAllowed);
    }

    getPermissionStatus();
  }, []);

  return hasPermission;
}
