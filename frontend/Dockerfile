FROM node:18.2.0-alpine3.15 as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.22.0-alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
