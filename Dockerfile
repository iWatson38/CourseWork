FROM node:16-alpine as builder

# Create app directory
WORKDIR /app

# Installing depencies
COPY package*.json .
RUN npm install

# Copying source files
COPY . .

# Building app
RUN npm run build
EXPOSE 3000

FROM builder as dev

# Running the app
CMD ["npm", "run", "start:dev"]
