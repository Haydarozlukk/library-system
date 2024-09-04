# Maven ve OpenJDK temel imajını kullan
FROM maven:3.8.4-openjdk-17 AS build

# Çalışma dizinini ayarla
WORKDIR /app

# Proje dosyalarını kopyala
COPY . .

# Projeyi inşa et
RUN mvn clean package -DskipTests

# Çalışma zamanı için hafif bir Java imajı kullan
FROM openjdk:17-jdk-slim

# İnşa edilen JAR dosyasını kopyala
COPY --from=build /app/target/library-system-0.0.1-SNAPSHOT.jar app.jar

# Uygulamayı çalıştır
CMD ["java", "-jar", "app.jar"]
