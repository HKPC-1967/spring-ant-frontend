Language : [简体中文](README.zh-CN.md) | [繁體中文](README.zh-HK.md)

## Sprint Ant Frontend (Frontend of [Spring Ant Family](https://github.com/HKPC-1967/spring-ant))

Sprint Ant Frontend is based on [Ant Design Pro v6.0.0-beta.1](https://github.com/ant-design/ant-design-pro), an out-of-the-box UI solution for enterprise applications，and the best React framework we've found for admin-panel web applications.  
Preview the original Ant Design Pro features here: [Ant Design Pro Preview](https://preview.pro.ant.design/dashboard/analysis).  
We enhanced the base project with:

- Unified HTTP payload format for consistent communication with [Spring Ant Backend](https://github.com/HKPC-1967/spring-ant). [requestErrorConfig.ts](src/requestErrorConfig.ts)
- Loading state management (loading spinners and a loading overlay to prevent user interaction while requests are in progress). [LoadingContext.tsx](src/api_core/components/LoadingContext.tsx)
- Unified error handling based on `errorCode` and `showType`; Network and HTTP-level errors are also handled uniformly. [requestErrorConfig.ts](src/requestErrorConfig.ts) [MessageProvider.tsx](src/api_core/components/MessageProvider.tsx) [errorCode.ts](src/locales/en-US/errorCode.ts)
- JWT-based authentication (access token and refresh token). [localStorageUtil.ts](src/utils/localStorageUtil.ts) [refreshTokenUtil.ts](src/utils/refreshTokenUtil.ts)
- RBAC (Role-Based Access Control) integration with the backend. [access.ts](src/access.ts) [routes.ts](config/routes.ts)
- Docker support with multi-stage builds. [Dockerfile](Dockerfile)

You can compare the `main` branch with `original_ant_design_pro_code/release_v6.0.0-beta.1` to review all custom enhancements on top of the original Ant Design Pro codebase.  
This project is the frontend part of the [Spring Ant Family](https://github.com/HKPC-1967/spring-ant).

## Environment Preparation (Node.js and PNPM)

### Option 1: [Use Volta](./readme/volta.md) (recommended for managing Node.js and PNPM versions across multiple projects)

### Option 2: Without Volta (recommended for a quick start if you are not familiar with Volta)

Check the Node.js version:

```bash
node --version
```

Install `pnpm`:

```bash
npm install pnpm -g
```

Check the `pnpm` version:

```bash
pnpm --version
```

Install dependencies:

```bash
pnpm install
```

## PNPM Scripts

Scripts are defined in [package.json](package.json).

### Run locally with hot reload for development (env: `config.dev.ts`)

`config.${UMI_ENV}.ts` official guide: https://umijs.org/docs/guides/env-variables#umi_env

> **Note**: If you use `pnpm start`, `REACT_APP_ENV` will be `false` instead of `dev`.

```bash
pnpm run start:dev
```

### Build the project

- Build for test (env: `config.test.ts`)

```bash
pnpm run build:test
```

- Build for production (env: `config.ts`)

```bash
pnpm run build
```

## Docker Scripts

### Docker build

- Build for test

```bash
docker build --build-arg BUILD_COMMAND="build:test" -t spring_ant_frontend .
```

- Build for production

```bash
docker build -t spring_ant_frontend .
```

### Docker run

```bash
docker run -itdp 8000:80 --name spring_ant_frontend spring_ant_frontend
```

## [Future Release Plan, Code Contribution, and Code Convention](./readme/code_contribution.md)
