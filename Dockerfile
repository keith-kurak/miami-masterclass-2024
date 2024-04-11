# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.19.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /

# Set production environment
ENV NODE_ENV="production"

# Final stage for app image
FROM base

COPY --link . .

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
# Force NODE_ENV to development to install devDependencies, bringing in Express, etc.
RUN NODE_ENV=development npm ci

RUN npx expo export -p web

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start-server" ]
