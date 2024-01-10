FROM maven:3-amazoncorretto-21 AS build

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:21-slim

WORKDIR /app

COPY --from=build /app/target/equity.salt-0.0.1-SNAPSHOT.jar equity.salt-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENV SERVER_PORT=8080

ENTRYPOINT ["java", "-jar","equity.salt-0.0.1-SNAPSHOT.jar"]