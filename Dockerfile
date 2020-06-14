FROM node:12.16.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

COPY ./dist/ .

EXPOSE 3033
CMD ["node", "main"]
