FROM node:18.2.0-alpine3.15

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

RUN chmod +x ./wait-for

EXPOSE 3000

# https://docs.docker.com/compose/startup-order/
CMD ./wait-for database:5432 && npx prisma db push && npm run start:prod
