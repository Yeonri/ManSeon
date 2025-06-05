import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

function formatTime(time: string) {
  const formatted = formatDistanceToNow(new Date(time), {
    addSuffix: true,
    locale: ko,
  });

  if (formatted.includes("1분 미만")) {
    return "방금 전";
  }

  return formatted;
}

export default formatTime;
