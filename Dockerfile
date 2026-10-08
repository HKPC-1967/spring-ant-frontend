# All 3 versions below were updated on 2026-02-08. Note that Node 24 will have the compatibility issue: "No such module: http_parser error" during max setup (recent Node builds removed http_parser bindings).
# Node.js version. It is better to use the same version via Volta for local development.
ARG NODE_VERSION=22.22.0
# other versions
ARG SERVE_VERSION=14.2.5

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine AS base

# Pin serve inside the actual build stage
ARG SERVE_VERSION

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Skip Husky in container builds where there is no .git directory.
ENV HUSKY=0

# Install serve.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g serve@${SERVE_VERSION}

################################################################################
# Create a stage for installing production dependecies.
FROM base AS deps

# Copy the dependency manifests needed for installation.
COPY package.json package-lock.json ./

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
RUN --mount=type=cache,target=/root/.npm \
    npm install

################################################################################
# Create a stage for building the application.
ARG BUILD_COMMAND="build"

FROM deps AS build

# Copy the rest of the source files into the image.
COPY . .
# Run the build script.
RUN npm run ${BUILD_COMMAND}

################################################################################
# Create a new stage to run the application with minimal runtime dependencies
# where the necessary files are copied from the build stage.
FROM base AS final

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
CMD ["serve", "-s", "-p", "80", "."]
