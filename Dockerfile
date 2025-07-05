FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY package.json ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 6969

CMD ["pnpm", "start"]