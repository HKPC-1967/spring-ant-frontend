# All 3 versions below were updated on 2026-02-08. Note that Node 24 will have the compatibility issue: "No such module: http_parser error" during max setup (recent Node builds removed http_parser bindings).
# Node.js and PNPM version. It is better to use the same versions via Volta for local development..
ARG NODE_VERSION=22.22.0
ARG PNPM_VERSION=10.30.0
# other versions
ARG SERVE_VERSION=14.2.5

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION} serve@${SERVE_VERSION}

################################################################################
# Create a stage for installing production dependecies.
FROM base as deps

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.local/share/pnpm/store to speed up subsequent builds.
# Leverage bind mounts to package.json and pnpm-lock.yaml to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install

################################################################################
# Create a stage for building the application.
ARG BUILD_COMMAND="build"

FROM deps as build

# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
#     --mount=type=cache,target=/root/.local/share/pnpm/store \
#     pnpm install

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN pnpm run ${BUILD_COMMAND}

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base as final

# Use production node environment by default.
# ENV NODE_ENV production

# Run the application as a non-root user.
USER node

# Copy package.json so that package manager commands can be used.
# COPY package.json .

# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
# COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist .


# Expose the port that the application listens on.
EXPOSE 80

# Run the application.
CMD serve -s -p 80 .
