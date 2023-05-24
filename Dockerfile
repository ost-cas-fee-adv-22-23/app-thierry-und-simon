# syntax=docker/dockerfile:1

# build
FROM node:18-alpine as build
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
ARG NPM_TOKEN
RUN echo "@smartive-education:registry=https://npm.pkg.github.com" > ~/.npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > ~/.npmrc \
    && npm ci
COPY . .
RUN npm run build

# start
FROM node:18-alpine 
WORKDIR /app
ARG NPM_TOKEN
ENV NODE_ENV=production
COPY --from=build /app/package.json /app/package-lock.json ./
RUN echo "@smartive-education:registry=https://npm.pkg.github.com" > ~/.npmrc \
    && echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > ~/.npmrc \
    && npm ci
COPY --from=build /app/.next ./.next
EXPOSE 3000
USER node
CMD npm run start