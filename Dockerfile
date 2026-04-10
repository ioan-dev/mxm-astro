# ── Этап 1: базовый образ ──────────────────────────────────────
# Используем Node 22 на Alpine Linux (лёгкий дистрибутив)
FROM node:22-alpine AS base
WORKDIR /app

# ── Этап 2: устанавливаем зависимости ─────────────────────────
FROM base AS deps
# Копируем только файлы с описанием зависимостей
COPY package.json package-lock.json ./
# Устанавливаем зависимости (ci = чистая установка по lock-файлу)
RUN npm ci

# ── Этап 3: собираем проект ────────────────────────────────────
FROM base AS build
# Берём node_modules из предыдущего этапа
COPY --from=deps /app/node_modules ./node_modules
# Копируем весь исходный код
COPY . .
# Запускаем сборку Astro
RUN npm run build

# ── Этап 4: финальный образ (только то, что нужно для запуска) ─
FROM base AS runtime
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

# Говорим серверу слушать все IP-адреса (иначе Traefik не достучится)
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000

# Команда запуска сервера
CMD ["node", "./dist/server/entry.mjs"]