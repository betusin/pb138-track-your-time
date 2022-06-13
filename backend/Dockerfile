FROM node:18.2.0-alpine3.15

# https://gist.github.com/vovimayhem/6437c2f03b654e392ccf3e9903eba6af?permalink_comment_id=3601962#gistcomment-3601962
RUN apk --update add ttf-dejavu fontconfig && rm -rf /var/cache/apk/*
RUN apk add --no-cache curl && \
    cd /tmp && curl -Ls https://github.com/dustinblackman/phantomized/releases/download/2.1.1/dockerized-phantomjs.tar.gz | tar xz && \
    cp -R lib lib64 / && \
    cp -R usr/lib/x86_64-linux-gnu /usr/lib && \
    cp -R usr/share /usr/share && \
    cp -R etc/fonts /etc && \
    curl -k -Ls https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 | tar -jxf - &&\
    cp phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/phantomjs && \
    rm -fR phantomjs-2.1.1-linux-x86_64 && \
    apk del curl

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

RUN chmod +x ./wait-for

EXPOSE 3000

# https://docs.docker.com/compose/startup-order/
CMD ./wait-for database:5432 && npx prisma db push --skip-generate && npm run start:prod
