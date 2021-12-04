# note that order matters in terms of docker build layers. Least changed near start to most changed...
# This image will be based on the official nodejs docker image
FROM node:15.14.0

# Create app directory
RUN mkdir -p /src/app
WORKDIR /src/app

# to make npm test run only once non-interactively
ENV CI=true
EXPOSE 80

# Install app dependencies
COPY package.json .
# COPY server.js .
# COPY tsconfig.json .
# COPY custom.d.ts .
RUN npm install --force


# Bundle app source
COPY ./public /src/app/public
COPY ./src /src/app/src

# Build and optimize react app
RUN npm run build

# defined in package.json
CMD [ "npm",  "start" ]
