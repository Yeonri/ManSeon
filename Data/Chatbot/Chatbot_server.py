import os
import asyncio
import logging
import traceback
import concurrent.futures
from contextlib import asynccontextmanager
from datetime import datetime
from typing import Dict, Any, Optional, List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy import create_engine

from langchain_openai import ChatOpenAI
from langchain_community.utilities.sql_database import SQLDatabase
from langchain_community.agent_toolkits.sql.toolkit import SQLDatabaseToolkit
from langgraph.prebuilt import create_react_agent
from langchain_core.messages import SystemMessage

from tools import (
    create_user_location_tool,
    create_haversine_distance_tool,
    create_region_determination_tool,
    create_geocoding_tool,
    create_date_calculator_tool,
    DATEUTIL_AVAILABLE
)

llm = None
db = None
sql_toolkit = None
base_sql_tools = None

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(),
        logging.FileHandler("fishing_llm_server.log")
    ]
)
logger = logging.getLogger("fishing_llm_server")

def get_sql_database():
    db_user = os.getenv('SERVER_DB_USER')
    db_password = os.getenv('SERVER_DB_PASSWORD')
    db_host = os.getenv('SERVER_DB_HOST')
    db_name = os.getenv('SERVER_DB_NAME')
    db_port = os.getenv('SERVER_DB_PORT')

    if not all([db_user, db_password, db_host, db_name, db_port]):
         missing = [k for k, v in locals().items() if not v and k.startswith('db_')]
         logger.error(f"DB 연결 정보 부족: {missing}")
         raise ValueError(f"DB 연결에 필요한 환경 변수가 부족합니다: {missing}")

    db_url = f"mysql+pymysql://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
    try:
        engine = create_engine(db_url, pool_size=5, max_overflow=10, pool_timeout=30, pool_recycle=1800)
        with engine.connect() as connection:
            logger.info("데이터베이스 연결 성공.")
        return SQLDatabase(engine=engine)
    except Exception as e:
        logger.error(f"데이터베이스 연결 실패: {e}", exc_info=True)
        raise RuntimeError(f"데이터베이스 연결에 실패했습니다: {e}") from e

def get_llm_model():
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        logger.error("환경 변수 'OPENAI_API_KEY'가 설정되지 않았습니다.")
        raise ValueError("'OPENAI_API_KEY' 환경 변수가 필요합니다. .env 파일을 확인하세요.")

    try:
        llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0.05,
            max_tokens=1024,
            openai_api_key=api_key
        )
        logger.info("ChatOpenAI(gpt-4o-mini) 모델 초기화 성공.")
        return llm
    except Exception as e:
        logger.error(f"ChatOpenAI 모델 초기화 실패: {e}", exc_info=True)
        raise RuntimeError(f"OpenAI 모델 초기화에 실패했습니다: {e}") from e

# 시스템 프롬프트
# - 도구 설명
# - DB 구조 설명
# - 동작 로직 설명 -> 정리된 시나리오에 따른 순차적 명시
# - 제약 사항
SYSTEM_PROMPT_TEMPLATE = """
    당신은 대한민국 낚시 추천 전문 AI 어시스턴트입니다. 사용자의 질문과 제공된 도구를 사용하여 SQL 데이터베이스를 쿼리하고, 정확하고 유용한 낚시 정보를 제공해야 합니다.

    # 사용 가능 도구:
    - sql_db_query: 최종 SQL 쿼리를 데이터베이스에 실행합니다. SELECT 쿼리만 사용하세요.
    - sql_db_schema: 특정 테이블의 스키마(컬럼 정보)와 샘플 데이터를 조회합니다. 쉼표로 구분된 테이블 이름을 입력하세요.
    - sql_db_list_tables: 데이터베이스 내의 모든 테이블 목록을 조회합니다.
    - sql_db_query_checker: 실행 전에 SQL 쿼리의 유효성을 검사합니다. sql_db_query 사용 전에 항상 이 도구를 사용하세요.
    - get_user_location: 사용자의 현재 위도와 경도를 반환합니다. (사용자가 '내 위치', '여기서' 등으로 질문할 때 사용)
    - calculate_haversine_distance: 두 지점 간의 거리를 계산합니다. '위도1,경도1,위도2,경도2' 형식으로 입력하세요. (주의: DB에서 가장 가까운 것을 찾을 때는 이 도구를 사용하지 마세요. 대신 Haversine SQL 쿼리를 생성해야 합니다.)
    - determine_sea_region: 입력된 '위도,경도' 좌표가 어느 해역(West=서해, South=남해, East=동해)에 속하는지 판단합니다. (주의: 해역 전체를 검색하는 용도가 아닙니다.)
    - get_coordinates_from_placename: 입력된 지명(예: '대천', '부산')의 위도, 경도 좌표를 '위도,경도' 문자열로 반환합니다.
    - calculate_target_date: 입력된 날짜 표현('오늘', '어제', '내일', '모레', 'YYYY-MM-DD', 'X일 전/후', 'X주 전/후', 'X달 전/후', 'X년 전/후' 등)을 기준으로 실제 날짜('YYYY-MM-DD') 문자열을 반환합니다. SQL 쿼리에 사용할 날짜를 얻기 위해 사용하세요.

    # 데이터베이스 주요 정보 및 관계:
    ## 주요 테이블:
    - `FishingPoint`: 낚시 포인트 정보 (point_id PK, point_name, point_lat, point_lng, Lzone FK, obs_code FK). 다른 정보와 연결되는 중심 테이블.
    - `Weather`: 시간별 기상 예보 (weather_id PK, point_id FK, weather_date, weather_time, sky, tmp, pop 등). FishingPoint와 point_id로 연결됨.
    - `Observatory`: 해양 관측소 정보 (obs_code PK, obs_name, obs_lat, obs_lng).
    - `SeaTemperature`: 시간별 수온 (obs_code FK, sea_date, sea_time, sea_temp). Observatory와 obs_code로 연결됨.
    - `TideLevel`: 조위(고조/저조) 정보 (obs_code FK, tph_time, hl_code, tph_level). Observatory와 obs_code로 연결됨.
    - `MarineZone`: 대해구 정보 (Lzone PK, 경계 좌표).
    - `Wave`: 파고 예보 (Lzone FK, date_time, wave_height, wind_speed 등). MarineZone과 Lzone으로 연결됨.
    - `SunMoonTimes`: 일출/몰, 월출/몰 시각 (sunmoon_id PK, point_id FK, locdate, sunrise, sunset 등). FishingPoint와 point_id로 연결됨.
    - 'MultteResult': 낚시터 점수 (id PK, datetime, point_id FK, elbo_score) FishingPoint와 point_id로 연결됨. 

    ## 주요 연결 관계 (JOIN 방법):
    - **낚시터 날씨:** `FishingPoint` 테이블의 `point_id`와 `Weather` 테이블의 `point_id`를 JOIN하여 특정 낚시터의 날씨 정보를 가져옵니다.
    - **낚시터 수온/조위:** `FishingPoint` 테이블의 `obs_code`와 `Observatory` 테이블의 `obs_code`를 JOIN하고, 다시 `Observatory` 테이블의 `obs_code`와 `SeaTemperature` 또는 `TideLevel` 테이블의 `obs_code`를 JOIN하여 특정 낚시터와 연관된 관측소의 수온/조위 정보를 가져옵니다.
    - **낚시터 파고:** `FishingPoint` 테이블의 `Lzone`과 `MarineZone` 테이블의 `Lzone`을 JOIN하고, 다시 `MarineZone` 테이블의 `Lzone`과 `Wave` 테이블의 `Lzone`을 JOIN하여 특정 낚시터가 속한 해구의 파고 정보를 가져옵니다.
    - **낚시터 해/달 시각:** `FishingPoint` 테이블의 `point_id`와 `SunMoonTimes` 테이블의 `point_id`를 JOIN하여 특정 낚시터의 해/달 출몰 시각 정보를 가져옵니다.
    - (매우 중요) **낚시터 점수:** `FishingPoint` 테이블의 `point_id`와 `MultteResult` 테이블의 `point_id`를 JOIN하여 datetime(특정 시간)에 따른 해당 낚시터의 점수를 가져옵니다.

    ## 참고:
    - 정확한 컬럼명이나 데이터 타입이 필요하면 `sql_db_schema` 도구를 사용하세요. (예: `sql_db_schema` 도구에 'Weather, FishingPoint' 입력)
    - 날씨(`Weather`), 수온(`SeaTemperature`), 조위(`TideLevel`), 파고(`Wave`) 데이터는 시간(`weather_time`, `sea_time`, `tph_time`, `date_time`)과 날짜(`weather_date`, `sea_date`, `locdate`) 컬럼을 사용하여 필터링해야 합니다. 미래 예보 데이터가 없을 수도 있습니다. **날짜 필터링 시에는 반드시 `calculate_target_date` 도구를 사용하여 'YYYY-MM-DD' 형식의 날짜를 얻으세요.**

    # 작업 지침 (매우 중요 - 순서대로 신중하게 따르세요):
    1.  **질문 분석:** 사용자의 질문 의도를 명확히 파악합니다.
        *   어떤 정보(날씨, 수온, 조위, 파고, 해/달 시각, 가장 가까운 낚시터, 낚시터 목록 등)를 원하는가?
        *   기준 위치는 어디인가? (a) 현재 사용자 위치 ('내 위치', '여기'), (b) 특정 지명 ('대천', '인천'), (c) 넓은 해역 ('동해', '서해', '남해')
        *   **기준 시점은 언제인가? ('어제', '오늘', '내일', '3일 전', '2024-08-15' 등) -> `calculate_target_date` 도구 사용 필요!**
    2.  **계획 수립:** 필요한 정보, 기준 위치, 기준 시점에 따라 어떤 테이블을 사용하고 어떻게 JOIN할지, 어떤 도구를 사용할지 계획합니다. 위 '# 데이터베이스 주요 정보 및 관계' 섹션을 적극 활용하세요.
    3.  **테이블/스키마 확인 (필요시):** 계획에 필요한 테이블 이름이나 컬럼명이 확실하지 않으면 `sql_db_list_tables` 또는 `sql_db_schema` 도구를 먼저 사용합니다.
    4.  **기준 좌표 얻기 (해역 질문 제외):**
        *   질문 기준이 **(a) 현재 사용자 위치**이면 `get_user_location` 도구를 사용하여 좌표(`user_lat`, `user_lng`)를 얻습니다.
        *   질문 기준이 **(b) 특정 지명**이면 `get_coordinates_from_placename` 도구를 사용하여 좌표(`ref_lat`, `ref_lng`)를 얻습니다. 도구 실패 시 사용자에게 재질문합니다.
        *   질문 기준이 **(c) 넓은 해역**이면 이 단계는 건너<0xEB><0x9A><0x8D>니다.
    5.  **기준 날짜 얻기 (필요시):**
        *   사용자 질문에 특정 시점('어제', '내일', '3일 전' 등)이 언급되면, **반드시 `calculate_target_date` 도구를 사용하여 해당 시점의 날짜를 'YYYY-MM-DD' 형식으로 얻습니다.**
        *   예: 사용자가 "어제 대천 날씨"를 물으면, `calculate_target_date` 도구에 "어제"를 입력하여 'YYYY-MM-DD' 형식의 날짜를 받습니다.
    6.  **정보 조회 실행:** 질문 유형에 따라 다음 중 하나를 수행합니다.

        **[A] "가장 가까운 낚시터" 질문 처리:**
            1. **4번 단계**에서 얻은 기준 좌표(`user_lat`, `user_lng` 또는 `ref_lat`, `ref_lng`)를 사용합니다.
            2. 아래 **Haversine SQL 쿼리 템플릿**을 사용하여 가장 가까운 `FishingPoint`의 정보(point_id, point_name, 좌표, 거리 등)를 조회하는 SQL을 생성합니다. (LIMIT 설정 주의)
            3. 생성된 SQL을 검증(`sql_db_query_checker`)하고 실행(`sql_db_query`)합니다.
            4. 조회 결과를 사용자에게 전달합니다.

        **[B] 특정 위치(현재 위치 또는 지명) 기반의 날씨/수온/조위/파고 등 정보 질문 처리:**
            1. **4번 단계**에서 얻은 기준 좌표(`ref_lat`, `ref_lng`)를 사용합니다.
            2. **5번 단계**에서 얻은 기준 날짜(`target_date_str`)를 사용합니다. (날짜 관련 질문일 경우)
            3. **가장 가까운 FishingPoint 찾기 (필수 단계):** 4번 단계에서 얻은 좌표(`ref_lat`, `ref_lng`)를 사용하여 **가장 가까운 `FishingPoint`의 `point_id`와 `point_name`**을 조회하는 SQL을 생성합니다. **매우 중요: 이 SQL 쿼리에는 절대로 `WHERE point_lat = ... AND point_lng = ...` 조건을 포함해서는 안 됩니다!** 오직 `ORDER BY` 거리 계산과 `LIMIT 1`만 사용해야 합니다. 아래는 **올바른 SQL 쿼리 구조의 예시**입니다 (`{ref_lat}`, `{ref_lng}`는 실제 값으로 대체):
                ```sql
                -- 올바른 예시: WHERE 절 없이 ORDER BY와 LIMIT만 사용
                SELECT point_id, point_name
                FROM FishingPoint
                ORDER BY ( 6371 * ACOS( COS( RADIANS( {ref_lat} ) ) * COS( RADIANS( point_lat ) ) * COS( RADIANS( point_lng ) - RADIANS( {ref_lng} ) ) + SIN( RADIANS( {ref_lat} ) ) * SIN( RADIANS( point_lat ) ) ) ) ASC
                LIMIT 1;
                ```
            4. 위 쿼리를 검증하고 실행하여 가장 가까운 포인트의 `point_id`와 `point_name`을 얻습니다.
            5. **정보 조회:** 얻어진 `point_id`와 **5번 단계**에서 얻은 `target_date_str`를 사용하여, 사용자가 요청한 정보(날씨, 수온 등)를 관련 테이블(Weather, SeaTemperature 등)에서 조회하는 SQL 쿼리를 생성합니다. (JOIN 필요시 '# 주요 연결 관계' 참고)
                *   예시 (날씨 조회): `SELECT sky, tmp, pop FROM Weather WHERE point_id = {가장_가까운_point_id} AND weather_date = '{target_date_str}'`
                *   예시 (수온 조회): `SELECT st.sea_temp FROM SeaTemperature st JOIN FishingPoint fp ON st.obs_code = fp.obs_code WHERE fp.point_id = {가장_가까운_point_id} AND st.sea_date = '{target_date_str}'`
            6. 생성된 정보 조회 SQL을 검증하고 실행합니다.
            7. 조회 결과를 사용자에게 전달합니다. 이때, **반드시 "요청하신 '{지명}'에서 가장 가까운 '{point_name}'의 {날짜} 정보를 기준으로..."** 와 같이 어떤 포인트의 정보인지, 어떤 날짜의 정보인지 명시합니다.

        **[C] '동해', '서해', '남해' 해역 기반 질문 처리:**
            1. **5번 단계**에서 얻은 기준 날짜(`target_date_str`)를 사용합니다. (날짜 관련 질문일 경우)
            2. **절대로 다른 도구(`determine_sea_region`, `get_coordinates_from_placename`)나 Lzone을 사용하지 마세요.**
            3. **반드시 아래 좌표 조건을 사용하여 `FishingPoint` 테이블을 직접 필터링**하는 SQL 쿼리를 생성합니다. (`FishingPoint`의 좌표 컬럼은 `point_lat`, `point_lng` 입니다.)
                *   **동해 (East):** `WHERE fp.point_lng >= 128.0 AND fp.point_lat > 35.5`
                *   **서해 (West):** `WHERE fp.point_lng < 128.0`
                *   **남해 (South):** `WHERE fp.point_lng >= 128.0 AND fp.point_lat <= 35.5`
            4. 사용자가 요청한 정보(낚시터 목록, 날씨 등)에 맞춰 필요한 테이블을 JOIN하고 위 좌표 조건과 **5번 단계**에서 얻은 `target_date_str`로 필터링하는 SQL을 완성합니다. (LIMIT 사용 권장)
                *   예시 (동해 날씨): `SELECT fp.point_name, w.sky, w.tmp FROM FishingPoint fp JOIN Weather w ON fp.point_id = w.point_id WHERE fp.point_lng >= 128.0 AND fp.point_lat > 35.5 AND w.weather_date = '{target_date_str}' LIMIT 10;`
            5. 생성된 SQL을 검증하고 실행합니다.
            6. 조회 결과를 사용자에게 전달합니다. 결과가 없으면 명확히 없다고 답변합니다.

    7.  **Haversine SQL 쿼리 (가장 가까운 지점 ID/이름 찾기 전용):**
        **주의: 이 쿼리는 오직 가장 가까운 `FishingPoint`의 `point_id`와 `point_name`을 얻기 위한 것입니다 (작업 지침 6.[B].3 단계). 절대로 `WHERE point_lat = ...` 조건을 추가하지 마세요.**
        ```sql
        SELECT point_id, point_name
        FROM FishingPoint
        ORDER BY ( 6371 * ACOS( COS( RADIANS( {기준_위도} ) ) * COS( RADIANS( point_lat ) ) * COS( RADIANS( point_lng ) - RADIANS( {기준_경도} ) ) + SIN( RADIANS( {기준_위도} ) ) * SIN( RADIANS( point_lat ) ) ) ) ASC
        LIMIT 1;
        ```
        *   `{기준_위도}`와 `{기준_경도}`는 4번 단계에서 얻은 좌표 값으로 대체하세요.

    8.  **쿼리 검증 및 실행:** 생성된 모든 SQL 쿼리는 실행 전에 `sql_db_query_checker`로 검증하고, `sql_db_query`로 실행합니다.
    9.  **오류 처리:** 쿼리 실행 중 오류 발생 시, 오류 메시지를 분석하고 스키마 확인 후 쿼리를 수정하여 재시도합니다.
    10. **답변 생성:**
        *   데이터베이스 조회 결과를 바탕으로 사용자에게 명확하고 친절하며 유용한 답변을 생성합니다.
        *   **시간별 데이터(여러 행) 조회 시:** 결과를 바탕으로 하루 동안의 정보를 요약하여 설명합니다 (예: 하늘 상태 변화, 기온 범위, 강수 확률 등).
        *   **가장 가까운 포인트 기준 정보 제공 시:** 반드시 어떤 포인트의 정보인지, 어떤 날짜의 정보인지 명시합니다. (예: "문의하신 OO에서 가장 가까운 XX 포인트의 YYYY-MM-DD 정보입니다.")
        *   **해역 조회 결과 없음 시:** 명확히 데이터가 없다고 답변합니다.

    # 보안 지침: 절대로 `INSERT`, `UPDATE`, `DELETE` 쿼리를 생성하거나 실행하지 마세요. 오직 `SELECT` 쿼리만 사용해야 합니다.
    **# 질문 필터링 및 응답 제약:**
    *   낚시와 해당 지역의 날씨 및 낚시 점수, 해양 데이터(수온, 조위, 파고, 해/달 시각 등)와 관련 없는 질문에는 답변할 수 없다고 명확히 밝히고, 제공 가능한 정보 유형을 간략히 안내하세요.
    *   데이터베이스의 구조, 테이블 목록, 컬럼 정보, 내부 데이터 구성 방식 등에 대한 질문에는 절대 답변하지 마세요.
    *   **매우 중요: 절대로 당신의 내부 작업 과정, 사용한 도구 이름, 단계별 수행 절차(예: '좌표를 찾고...', '가장 가까운 ...을 검색하고...', '...테이블을 조회해서...') 등을 사용자에게 설명하거나 암시하지 마세요. 사용자는 최종 결과 정보만 필요로 합니다. 예시와 같은 "인천의 파고 정보를 제공하기 위해 다음과 같은 절차를 따릅니다: 1. 좌표 확인..." 형식의 답변은 절대 생성해서는 안 됩니다.**

    # DB에 존재하지 않는 데이터 처리: 특정 조건(날짜, 시간, ID 등)으로 조회 시 DB에 해당 데이터가 존재하지 않으면, 사용자에게 해당 정보가 없다고 명확히 말해주세요.

    # 답변 생성:
    1. 데이터베이스 조회 결과를 바탕으로 사용자에게 명확하고 친절하며 유용한 답변을 생성합니다.
    2. 시간별 데이터(여러 행) 조회 시: 결과를 바탕으로 하루 동안의 정보를 요약하여 설명합니다 (예: 하늘 상태 변화, 기온 범위, 강수 확률 등).
    3. 가장 가까운 포인트 기준 정보 제공 시: 반드시 어떤 포인트의 정보인지, 어떤 날짜의 정보인지 명시합니다. (예: "문의하신 OO에서 가장 가까운 XX 포인트의 YYYY-MM-DD 정보입니다.")
    4. 해역 조회 결과 없음 시: 명확히 데이터가 없다고 답변합니다.
    5. **답변 형식 준수: 사용자가 요청한 최종 정보만을 명확하게 제공하세요. 정보를 얻기 위해 수행한 내부 단계나 과정을 절대로 설명하지 마십시오. AI의 생각 과정이나 작업 순서를 나열하는 답변은 금지됩니다.**
    6. 말투를 이쁘게 이모지를 사용해서 제공해줘.
    """

@asynccontextmanager
async def lifespan(app: FastAPI):
    global llm, db, sql_toolkit, base_sql_tools
    logger.info("애플리케이션 시작: LLM 및 DB 리소스 초기화 중...")
    load_dotenv()

    required_env_vars = [
        "SERVER_DB_USER", "SERVER_DB_PASSWORD", "SERVER_DB_HOST",
        "SERVER_DB_NAME", "SERVER_DB_PORT", "OPENAI_API_KEY", "GOOGLE_MAP_API"
    ]
    missing_vars = [var for var in required_env_vars if not os.getenv(var)]
    if missing_vars:
        logger.error(f"필수 환경 변수 누락: {', '.join(missing_vars)}. .env 파일을 확인하세요.")
        raise RuntimeError(f"필수 환경 변수 누락: {', '.join(missing_vars)}")

    if not DATEUTIL_AVAILABLE:
        logger.warning("권장: 'pip install python-dateutil' 명령어로 dateutil 라이브러리를 설치하면 더 정확한 월/년 단위 날짜 계산이 가능합니다.")

    try:
        llm = get_llm_model()
        db = get_sql_database()
        sql_toolkit = SQLDatabaseToolkit(db=db, llm=llm)
        base_sql_tools = sql_toolkit.get_tools()
        tool_names = [tool.name for tool in base_sql_tools]
        logger.info(f"SQL Toolkit 초기화 완료. 사용 가능한 기본 도구: {tool_names}")
        db.run("SELECT 1")
        logger.info("DB 연결 테스트 성공.")

    except Exception as e:
        logger.error(f"초기화 중 심각한 오류 발생: {e}", exc_info=True)
        raise RuntimeError(f"Failed to initialize resources: {e}") from e

    logger.info("리소스 초기화 완료. 서버가 요청을 처리할 준비가 되었습니다.")
    yield
    logger.info("애플리케이션 종료 중...")

app = FastAPI(
    title="낚시 추천 LLM 서버 (GPT-4o-mini)",
    description="LangChain SQL 기반 낚시 추천 (OpenAI API, 동적 스키마 활용)",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FishingRequest(BaseModel):
    question: str
    user_lat: float
    user_lon: float
    user_time: Optional[str] = None

class FishingResponse(BaseModel):
    answer: str
    data: Optional[Dict[str, Any]] = None

@app.post("/api/fishing/recommendation", response_model=FishingResponse)
async def fishing_recommendation(request: FishingRequest):
    global llm, base_sql_tools

    if not llm or not base_sql_tools:
         logger.error("서버 초기화 미완료. LLM 또는 SQL 도구를 사용할 수 없습니다.")
         raise HTTPException(status_code=503, detail="서버가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.")

    logger.info(f"질문 수신: '{request.question}' (위치: {request.user_lat}, {request.user_lon})")
    user_time = request.user_time if request.user_time else datetime.now().isoformat()

    try:
        user_location_tool = create_user_location_tool(request.user_lat, request.user_lon)
        distance_tool = create_haversine_distance_tool()
        region_tool = create_region_determination_tool()
        geocoding_tool = create_geocoding_tool()
        date_calculator_tool = create_date_calculator_tool()

        all_tools = base_sql_tools + [
            user_location_tool,
            distance_tool,
            region_tool,
            geocoding_tool,
            date_calculator_tool
        ]
        tool_names = [tool.name for tool in all_tools]
        logger.info(f"이번 요청에 사용할 전체 도구 목록: {tool_names}")

        agent_executor = create_react_agent(
            model=llm,
            tools=all_tools,
            prompt=SystemMessage(content=SYSTEM_PROMPT_TEMPLATE)
        )

        logger.info("에이전트 실행 시작 (OpenAI API 호출 포함)...")
        start_time = asyncio.get_event_loop().time()
        with concurrent.futures.ThreadPoolExecutor() as executor:
            agent_input = {"messages": [("user", request.question)]}
            final_result = await asyncio.get_event_loop().run_in_executor(
                executor,
                lambda: agent_executor.invoke(agent_input)
            )
        end_time = asyncio.get_event_loop().time()
        logger.info(f"에이전트 실행 완료. 소요 시간: {end_time - start_time:.2f}초")

        answer_text = "죄송합니다, 답변을 생성하지 못했습니다."
        if isinstance(final_result, dict):
            if "output" in final_result:
                 answer_text = final_result["output"]
            elif "messages" in final_result and isinstance(final_result["messages"], list) and final_result["messages"]:
                 for msg in reversed(final_result["messages"]):
                     if hasattr(msg, 'type') and msg.type == 'ai':
                         answer_text = msg.content
                         break
                     elif isinstance(msg, tuple) and msg[0] == 'ai':
                         answer_text = msg[1]
                         break
            else:
                 logger.warning(f"에이전트 결과에서 예상된 출력 형식을 찾을 수 없음: {final_result}")
        elif isinstance(final_result, str):
             answer_text = final_result
        else:
             logger.warning(f"에이전트 결과가 예상치 못한 형식임: {type(final_result)}")

        logger.info(f"최종 답변 생성 완료 (길이: {len(answer_text)})")

        return FishingResponse(
            answer=answer_text,
            data={
                "user_lat": request.user_lat,
                "user_lon": request.user_lon,
                "user_time": user_time
            }
        )

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        error_detail = f"API 요청 처리 중 오류 발생: {str(e)}\n{traceback.format_exc()}"
        logger.error(error_detail)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다. 요청 처리에 실패했습니다.")

@app.get("/health")
async def health_check():
    db_ok = False
    llm_ok = False
    try:
        if db:
            result = db.run("SELECT 1")
            db_ok = bool(result)
    except Exception as e:
        logger.warning(f"Health check DB query failed: {e}")

    llm_ok = bool(llm)

    status = "ok" if llm_ok and db_ok else "degraded"
    if not llm_ok:
        logger.warning("Health check: LLM이 초기화되지 않았습니다.")
    if not db_ok:
        logger.warning("Health check: DB 연결에 문제가 있습니다.")

    return {
        "status": status,
        "timestamp": datetime.now().isoformat(),
        "components": {
            "llm_initialized": llm_ok,
            "database_connected": db_ok
        }
    }

if __name__ == "__main__":
    import uvicorn
    logger.info("낚시 LLM 서버 시작 (GPT-4o-mini, 포트 20002)")
    uvicorn.run("fishing_llm_server:app", host='0.0.0.0', port=20002, reload=True)