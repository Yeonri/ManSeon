import { formatDistanceToNowStrict } from "date-fns";
import { ko } from "date-fns/locale";

export function FormatTime(time: string) {
  const dotIndex = time.indexOf(".");
  const trimmed = dotIndex !== -1 ? time.substring(0, dotIndex + 4) : time;
  const utcTime = trimmed.endsWith("Z") ? trimmed : trimmed + "Z";
  const parsedDate = new Date(utcTime);

  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - parsedDate.getTime()) / 1000
  );

  if (diffInSeconds < 60) {
    return "방금 전";
  }

  return formatDistanceToNowStrict(parsedDate, {
    addSuffix: true,
    locale: ko,
  });
}
