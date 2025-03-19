#############
##  1.빌드  ##
#############

# 베이스 이미지 (임의 버전)
FROM gradle:8.12.0-jdk17-alpine AS build

# 컨테이너 작업 경로
WORKDIR /home/gradle/BE

# 종속성 관련 복사(캐싱)
COPY build.gradle settings.gradle ./

# 소스 코드 복사
COPY src ./src/

# 빌드 (테스트 X)
RUN gradle build -x test 

################
# 2. 이미지 생성  #
################

# 실행 이미지
FROM openjdk:17-jdk-alpine

# 컨테이너 작업 경로
WORKDIR /BE

# 빌드된 JAR 파일 복사
COPY --from=build /home/gradle/BE/build/libs/*.jar app.jar

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]

# 컨테이너 포트 문서화
EXPOSE 8080

