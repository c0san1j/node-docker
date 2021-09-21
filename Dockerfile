# Getting nodejs ver 15
FROM node:15
# Setting working default folder
WORKDIR /app
# Copying package.json only to default folder
COPY package.json .
# installing all packages from npm
# RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ] ; then npm install ; else npm install --only=production ; fi


# Copy all files from current folder to app folder
COPY . ./
# ENV VARIABLES
ENV PORT 3000
# Opening a port number for docker but by default docker can talt to outside world
# but outside world can't talk to docker so use -p arg for -p 3000:3000 to open a hole
# We must expose the correct port base on nodejs listening port.
# also -p 6000:3000 the right side 3000 is nodejs and left side 6000 is your own custom port as it get redirected.
EXPOSE $PORT
# Start app from command line
CMD ["node", "index.js"]

# Docker Build from current working directory with no name plz dont use 
# docker build .

# Docker Build from current working directory with name of node-app-image 
# docker build -t node-app-image .

# Check all docker images list
# docker image ls

# Remove docker command
# docker image rm #ID

# This run container with a name using --name and also detach it from cli using -d argument
# docker run -d --name node-app node-app-image

# Check Docker container
# docker ps

# To access container bash
# docker exec -it node-app bash