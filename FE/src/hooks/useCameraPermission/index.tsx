import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { PermissionAlert } from "../../utils/permissionAlert";

function isAuthorized(status: CameraPermissionStatus): boolean {
  return status === "granted";
}

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    async function getPermissionStatus() {
      const currentStatus = await Camera.getCameraPermissionStatus();
      console.log("[카메라 권한] 현재:", currentStatus);

      if (isAuthorized(currentStatus)) {
        setHasPermission(true);
        return;
      }

      const requestedStatus = await Camera.requestCameraPermission();
      console.log("[카메라 권한] 요청 후:", requestedStatus);

      if (requestedStatus === "denied") {
        console.log("[카메라 권한] BLOCKED");
        PermissionAlert("카메라");
        setHasPermission(false);
        return;
      }

      setHasPermission(isAuthorized(requestedStatus));
    }

    getPermissionStatus();
  }, []);

  return hasPermission;
}
