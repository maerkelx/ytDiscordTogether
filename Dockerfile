FROM node:alpine

WORKDIR /code

COPY . .

RUN npm install

RUN npm run build
EXPOSE 3000
CMD npm run start