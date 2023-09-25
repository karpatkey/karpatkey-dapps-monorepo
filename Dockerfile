
FROM node:20.0.0-alpine as builder

RUN apk update && \
    apk add git && \
    apk add openssh-client && \
    apk add --no-cache python3 py3-pip

WORKDIR /app

COPY . .

RUN yarn install

# Production image
FROM node:lts-alpine

WORKDIR /app

# Copy built files from the builder stage for reports app
COPY --from=builder ./app/ ./

# Expose the necessary ports
EXPOSE 3000
EXPOSE 3001

# Start the reports app
CMD ["yarn", "dev"]
