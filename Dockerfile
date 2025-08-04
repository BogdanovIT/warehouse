FROM node:18-bullseye

# Устанавливаем зависимости с повтором при ошибках
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-17-jdk \
    curl \
    unzip \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Настройка Android SDK
RUN mkdir -p /opt/android-sdk/cmdline-tools && \
    cd /opt/android-sdk/cmdline-tools && \
    curl -fL https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -o cmd-tools.zip && \
    unzip -q cmd-tools.zip && \
    rm cmd-tools.zip && \
    mv cmdline-tools latest && \
    yes | latest/bin/sdkmanager --licenses

# Установка переменных окружения
ENV ANDROID_HOME /opt/android-sdk
ENV PATH ${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools

# Установка платформы и build-tools
RUN sdkmanager "platforms;android-34" "build-tools;34.0.0" "platform-tools"

# Копирование проекта
WORKDIR /app
COPY . .

# Установка зависимостей проекта
RUN npm install -g expo-cli && \
    npm install