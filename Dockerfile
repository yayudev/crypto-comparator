FROM node:16.8.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install

# Bundle app source
COPY . .

# Run server
EXPOSE 3000
CMD [ "yarn", "start" ]