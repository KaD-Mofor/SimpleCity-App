FROM eclipse-temurin:17-alpine
LABEL authors="Daniel Kubong"

VOLUME /tmp

ADD ./target/app-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]