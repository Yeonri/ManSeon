import os
import logging
from datetime import date, timedelta
import re
import requests
from haversine import haversine, Unit
from langchain.agents import Tool

try:
    from dateutil.relativedelta import relativedelta
    DATEUTIL_AVAILABLE = True
except ImportError:
    DATEUTIL_AVAILABLE = False


logger = logging.getLogger("fishing_tools")

# LangChain Tool 객체를 생성하는 함수들

# 사용자 위치 반환 도구
def create_user_location_tool(user_lat: float, user_lon: float) -> Tool:
    """사용자의 현재 위치를 반환하는 Tool 객체를 생성합니다."""
    return Tool(
        name="get_user_location",
        func=lambda _: f"사용자 현재 위치: 위도 {user_lat}, 경도 {user_lon}",
        description="사용자의 현재 GPS 위도, 경도 정보를 반환합니다. 가까운 낚시터를 찾거나 현재 위치 기반 정보가 필요할 때 사용하세요."
    )

# 지역 분류 (동해, 서해, 남해) 도구
def create_region_determination_tool() -> Tool:
    """좌표를 기반으로 해역(동해/서해/남해)을 판별하는 Tool 객체를 생성합니다."""
    def determine_region_from_coords(lat_lon_str: str) -> str:
        try:
            lat_str, lon_str = lat_lon_str.split(',')
            latitude = float(lat_str.strip())
            longitude = float(lon_str.strip())

            if longitude < 128.0:
                region = 'West' # 서해
            elif longitude >= 128.0:
                if latitude <= 35.5:
                    region = 'South' # 남해
                else:
                    region = 'East' # 동해
            else:
                region = 'Unknown' # 알 수 없음

            logger.info(f"좌표 ({latitude}, {longitude}) -> 지역: {region}")
            return region
        except ValueError:
            logger.warning(f"잘못된 좌표 형식 입력: {lat_lon_str}")
            return "오류: 입력 형식이 잘못되었습니다. '위도,경도' 형식의 숫자를 입력해야 합니다. 예: '37.5,127.0'"
        except Exception as e:
            logger.error(f"지역 판별 중 오류 발생: {e}", exc_info=True)
            return f"지역 판별 중 오류 발생: {str(e)}"

    return Tool(
        name="determine_sea_region",
        func=determine_region_from_coords,
        description="""입력받은 위도와 경도 좌표가 대한민국의 어느 해역(West=서해, South=남해, East=동해)에 속하는지 판단합니다.
        입력 형식은 반드시 '위도,경도' 형태의 문자열이어야 합니다. (예: '35.1,129.1')
        사용자 위치나 특정 지점의 해역을 알아야 할 때 사용하세요. (주의: 해역 전체를 검색하는 용도가 아닙니다.)"""
    )

# 좌표 거리 계산 도구 -> 두 지점 간의 Haversine 거리를 계산하는 Tool 객체를 생성
def create_haversine_distance_tool() -> Tool:
    def calculate_distance(coords_str: str) -> str:
        try:
            coords = [float(x.strip()) for x in coords_str.split(',')]
            if len(coords) != 4:
                return "오류: 4개의 좌표(위도1,경도1,위도2,경도2)가 쉼표로 구분되어야 합니다."
            point1 = (coords[0], coords[1])
            point2 = (coords[2], coords[3])
            distance = haversine(point1, point2, unit=Unit.KILOMETERS)
            return f"두 지점 사이의 거리: {distance:.2f}km"
        except ValueError:
            logger.warning(f"거리 계산 중 잘못된 숫자 형식 입력: {coords_str}")
            return "오류: 입력값은 숫자여야 합니다. '위도1,경도1,위도2,경도2' 형식으로 입력하세요."
        except Exception as e:
            logger.error(f"거리 계산 중 오류 발생: {e}", exc_info=True)
            return f"거리 계산 중 내부 오류 발생: {str(e)}"

    return Tool(
        name="calculate_haversine_distance",
        func=calculate_distance,
        description="""두 지점의 위도, 경도 쌍 사이의 거리를 킬로미터(km) 단위로 계산합니다.
        입력 형식: '위도1,경도1,위도2,경도2'. 예: '37.5,127.0,35.1,129.1'.
        (주의: DB에서 가장 가까운 것을 찾을 때는 이 도구를 사용하지 마세요. 대신 Haversine SQL 쿼리를 생성해야 합니다.)"""
    )

# 지오코딩 (지명 -> 좌표) 도구 -> 지명을 좌표로 변환하는 (Google Geocoding API 사용) Tool 객체를 생성
def create_geocoding_tool() -> Tool:
    def _get_coordinates_from_placename(place_name: str) -> str:
        api_key = os.getenv('GOOGLE_MAP_API')
        if not api_key:
            logger.error("환경 변수 'GOOGLE_MAP_API'가 설정되지 않았습니다.")
            return "오류: 지오코딩 API 키가 설정되지 않았습니다."

        logger.info(f"지오코딩 시도: '{place_name}'")
        api_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={place_name}&key={api_key}&language=ko" # 한국어 결과 우선

        try:
            response = requests.get(api_url, timeout=5)
            response.raise_for_status()
            data = response.json()

            if data and data.get("status") == "OK" and data.get("results"):
                location = data["results"][0]["geometry"]["location"]
                latitude = location["lat"]
                longitude = location["lng"]
                result_str = f"{latitude},{longitude}"
                logger.info(f"지오코딩 성공: '{place_name}' -> {result_str}")
                return result_str
            else:
                logger.warning(f"지오코딩 실패: '{place_name}'에 대한 좌표를 찾을 수 없습니다. 응답 상태: {data.get('status')}, 메시지: {data.get('error_message')}")
                return f"오류: '{place_name}'에 대한 좌표를 찾을 수 없습니다."

        except requests.exceptions.Timeout:
             logger.error(f"지오코딩 API 호출 시간 초과: {place_name}")
             return "오류: 지오코딩 서비스 응답 시간이 초과되었습니다."
        except requests.exceptions.RequestException as e:
            logger.error(f"지오코딩 API 호출 오류: {e}", exc_info=True)
            return f"오류: 지오코딩 서비스에 연결할 수 없습니다. ({type(e).__name__})"
        except Exception as e:
            logger.error(f"지오코딩 처리 중 예상치 못한 오류 발생: {e}", exc_info=True)
            return f"오류: 좌표 변환 중 문제가 발생했습니다."

    return Tool(
        name="get_coordinates_from_placename",
        func=_get_coordinates_from_placename,
        description="""입력된 지명(장소 이름, 예: '대천', '부산 해운대')의 위도, 경도 좌표를 '위도,경도' 형태의 문자열로 반환합니다.
        사용자가 특정 장소를 기준으로 정보를 물어볼 때 (예: '대천에서 가장 가까운 곳은?'), 해당 장소의 좌표를 얻기 위해 사용하세요.
        만약 이 도구로 좌표를 찾지 못하면, 사용자에게 더 구체적인 장소 이름을 묻거나 현재 사용자 위치 기준으로 검색할지 물어보세요."""
    )

# 날짜 계산 도구 ->  상대적/절대적 날짜 표현을 'YYYY-MM-DD' 형식으로 변환하는 Tool 객체를 생성
def create_date_calculator_tool() -> Tool:
    if not DATEUTIL_AVAILABLE:
         logger.warning("권장: 'pip install python-dateutil' 명령어로 dateutil 라이브러리를 설치하면 더 정확한 월/년 단위 날짜 계산이 가능합니다.")

    def _calculate_target_date(relative_date_str: str) -> str:
        try:
            today = date.today()
            input_str = relative_date_str.strip()
            target_date = None
            processed = False # 상대 날짜 처리 여부 플래그

            # 1. 특정 키워드 처리
            if not processed:
                if input_str == "오늘" or "today" in input_str.lower():
                    target_date = today
                    processed = True
                elif input_str == "어제" or "yesterday" in input_str.lower():
                    target_date = today - timedelta(days=1)
                    processed = True
                elif input_str == "내일" or "tomorrow" in input_str.lower():
                    target_date = today + timedelta(days=1)
                    processed = True
                elif input_str == "모레" or "day after tomorrow" in input_str.lower():
                    target_date = today + timedelta(days=2)
                    processed = True

            # 2. 절대 날짜 (YYYY-MM-DD) 처리
            if not processed and len(input_str) == 10 and input_str[4] == '-' and input_str[7] == '-':
                 try:
                     target_date = date.fromisoformat(input_str)
                     processed = True
                 except ValueError:
                     logger.warning(f"Input '{input_str}' looks like a date but failed to parse.")

            # 3. 상대 날짜 (X일/주/달/년 전/후) 처리 (정규 표현식 사용)
            if not processed:
                # 패턴 정의 (숫자 + 단위 + 전/후)
                patterns = {
                    # '전' 패턴
                    r"(\d+)\s*년\s*전": ("years", -1),
                    r"(\d+)\s*(?:달|개월)\s*전": ("months", -1),
                    r"(\d+)\s*주\s*전": ("weeks", -1),
                    r"(\d+)\s*일\s*전": ("days", -1),
                    # '후' 패턴
                    r"(\d+)\s*년\s*후": ("years", 1),
                    r"(\d+)\s*(?:달|개월)\s*후": ("months", 1),
                    r"(\d+)\s*주\s*후": ("weeks", 1),
                    r"(\d+)\s*일\s*후": ("days", 1),
                }

                for pattern, (unit, multiplier) in patterns.items():
                    match = re.fullmatch(pattern, input_str)
                    if match:
                        try:
                            num = int(match.group(1))
                            delta_value = num * multiplier

                            if unit == "days":
                                target_date = today + timedelta(days=delta_value)
                            elif unit == "weeks":
                                target_date = today + timedelta(weeks=delta_value)
                            elif DATEUTIL_AVAILABLE and (unit == "months" or unit == "years"):
                                if unit == "months":
                                    target_date = today + relativedelta(months=delta_value)
                                elif unit == "years":
                                    target_date = today + relativedelta(years=delta_value)
                            elif not DATEUTIL_AVAILABLE and (unit == "months" or unit == "years"):
                                logger.warning(f"'{input_str}' 계산을 위해 python-dateutil 필요. 근사치(일)로 계산합니다.")
                                if unit == "months":
                                    target_date = today + timedelta(days=delta_value * 30)
                                elif unit == "years":
                                    target_date = today + timedelta(days=delta_value * 365)
                            else:
                                pass

                            if target_date:
                                processed = True
                                break

                        except ValueError:
                            logger.warning(f"패턴 '{pattern}'에서 숫자 추출 실패: '{input_str}'")
                            continue

            if target_date:
                date_str = target_date.strftime('%Y-%m-%d')
                logger.info(f"날짜 계산: '{relative_date_str}' -> {date_str}")
                return date_str
            else:
                logger.warning(f"인식할 수 없는 날짜 형식: '{relative_date_str}'. 오늘 날짜를 반환합니다.")
                return today.strftime('%Y-%m-%d')

        except Exception as e:
            logger.error(f"날짜 계산 중 오류 발생 ('{relative_date_str}'): {e}", exc_info=True)
            return f"오류: 날짜 계산 중 문제가 발생했습니다: {str(e)}"

    return Tool(
        name="calculate_target_date",
        func=_calculate_target_date,
        description="""입력된 날짜 표현('오늘', '어제', '내일', '모레', 'YYYY-MM-DD', 'X일 전/후', 'X주 전/후', 'X달 전/후', 'X년 전/후' 등)을 기준으로 실제 날짜('YYYY-MM-DD') 문자열을 반환합니다.
        사용자가 '어제 날씨', '3일 후 수온', '2024-07-15 조위', '1년 전 데이터' 등을 물어볼 때, SQL 쿼리에 사용할 정확한 날짜 문자열을 얻기 위해 이 도구를 사용하세요.
        인식할 수 없는 경우 기본적으로 오늘 날짜를 반환할 수 있습니다."""
    )