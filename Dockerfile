FROM        ubuntu:16.04
RUN         apt-get update
RUN         apt-get install -y curl nano rsync
RUN         curl -sL https://deb.nodesource.com/setup_11.x | bash -; apt-get install -y nodejs

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

COPY /package.json /package.json

RUN npm install
RUN npm audit fix

# Install `serve` to run the application.
RUN npm install -g serve

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production

# Set the command to start the node server.
CMD serve -s build

# Tell Docker about the port we'll run on.
EXPOSE 5000
