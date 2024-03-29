# syntax=docker/dockerfile:1

# Install dependencies only when needed
FROM node:18-alpine as build
WORKDIR /app
COPY ["package.json", "package-lock.json", "next.config.js", "./"]
ARG NPM_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm ci && \
    rm -rf .npmrc
RUN npm install

# Rebuild the source code only when needed
FROM node:18-alpine as development
WORKDIR /app
ENV NODE_ENV development
ENV NEXT_TELEMETRY_DISABLED 1
COPY . .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.js ./
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine as production
ARG NPM_TOKEN
WORKDIR /app
ENV NODE_ENV production
COPY --from=development /app/public ./public
COPY --from=development /app/.next ./.next
COPY --from=development /app/node_modules ./node_modules
COPY --from=development /app/package.json /app/package-lock.json ./
COPY --from=development /app/terraform ./terraform
COPY --from=development /app/next.config.js ./
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_TOKEN" > .npmrc && \
    npm ci && \
    rm -rf .npmrc
ENV NEXT_PUBLIC_QWACKER_API_URL=https://qwacker-api-http-prod-4cxdci3drq-oa.a.run.app/
EXPOSE 3000
USER node
CMD npm run start