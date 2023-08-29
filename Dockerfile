### STAGE 1: Build ###
FROM node:alpine AS build-stage
WORKDIR /app
COPY ./*.json ./
COPY ./tailwind.config.js ./
COPY ./src ./src
RUN npm install && npm run build

### STAGE 2: Run ###
FROM nginx:alpine AS run-stage
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist/stratus /usr/share/nginx/html
