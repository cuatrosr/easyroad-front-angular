FROM node:20-alpine

RUN npm install -g @angular/cli

WORKDIR /var/www/html/easyroad-frontend
COPY . /var/www/html/easyroad-frontend

COPY ./package*.json ./
COPY ./angular.json ./

RUN npm install --legacy-peer-dep

EXPOSE 4250

ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000", "--port", "4250", "--disable-host-check"]
