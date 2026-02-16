# DEVELOPMENT STAGE
FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# PRODUCTION STAGE
FROM node:22-bookworm-slim AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

CMD [ "node", "dist/index.js" ]