import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

export function FormatTime(time: string) {
  return formatDistanceToNow(new Date(time), { addSuffix: true, locale: ko });
}
