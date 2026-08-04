Language : [English](README.md) | [繁體中文](README.zh-HK.md)

## Spring Ant Frontend ([Spring Ant Family](https://github.com/HKPC-1967/spring-ant)的前端部分)

Spring Ant Frontend 基于 [Ant Design Pro v6.0.0-beta.1](https://github.com/ant-design/ant-design-pro)，这是一个开箱即用的企业级 UI 框架，也是我们找到的最好的用于开发 后台管理系统 的 React 框架。可在这里预览原始 Ant Design Pro 功能：[Ant Design Pro Preview](https://preview.pro.ant.design/dashboard/analysis)。

我们对基础项目做了以下增强：

- 统一的HTTP payload格式，与后端[Spring Ant Backend](https://github.com/HKPC-1967/spring-ant)集成。[requestErrorConfig.ts](src/requestErrorConfig.ts)
- Loading 状态管理（加载中的局部loading动画以及全局遮罩，避免请求进行中用户继续操作）。[LoadingContext.tsx](src/api_core/components/LoadingContext.tsx)
- 基于 `errorCode` 和 `showType` 的统一异常处理；同时对网络错误和 HTTP 层级错误也做了统一处理。[requestErrorConfig.ts](src/requestErrorConfig.ts) [MessageProvider.tsx](src/api_core/components/MessageProvider.tsx)
- 基于 JWT 的认证（access token 与 refresh token）。[localStorageUtil.ts](src/utils/localStorageUtil.ts) [refreshTokenUtil.ts](src/utils/refreshTokenUtil.ts)
- 与后端集成的 RBAC（基于角色的访问控制）。[access.ts](src/access.ts) [routes.ts](config/routes.ts)
- 支持 Docker 多阶段构建。[Dockerfile](Dockerfile)

你可以对比 `main` 分支与 `original_ant_design_pro_code/release_v6.0.0-beta.1` 分支，查看我们在原始的 Ant Design Pro 代码基础上做了哪些代码改动。  
本项目是 [Spring Ant Family](https://github.com/HKPC-1967/spring-ant) 的前端部分。

## 环境准备（Node.js 与 PNPM）

> 本项目用的 Node.js 与 PNPN 版本定义在 `package.json` 的 `volta` 对象中，建议保持版本一致防止版本兼容问题

### 方案 1：[使用 Volta](./readme/volta.zh-CN.md)（推荐，可管理多个项目的 Node.js 与 PNPM 版本）

### 方案 2：不使用 Volta（如果你不熟悉 Volta 想快速开始，但注意 Node.js 大版本要保持一致）

检查 Node.js 版本：

```bash
node --version
```

安装 `pnpm`：

```bash
npm install pnpm -g
```

检查 `pnpm` 版本：

```bash
pnpm --version
```

安装依赖：

```bash
pnpm install
```

## PNPM 脚本

脚本定义在 [package.json](package.json) 中。

### 本地开发热更新运行（环境：`config.dev.ts`）

`config.${UMI_ENV}.ts` 官方文档: https://umijs.org/docs/guides/env-variables#umi_env

> **注意**：如果使用 `pnpm start`，`REACT_APP_ENV` 的值会是 `false`，而不是 `dev`。

```bash
pnpm run start:dev
```

### 构建项目

- 测试环境构建（环境：`config.test.ts`）

```bash
pnpm run build:test
```

- 生产环境构建（环境：`config.ts`）

```bash
pnpm run build
```

## Docker 脚本

### Docker 构建

- 测试环境构建

```bash
docker build --build-arg BUILD_COMMAND="build:test" -t base_front .
```

- 生产环境构建

```bash
docker build -t base_front .
```

### Docker 运行

```bash
docker run -d -p 80:80 --name base_front base_front
```

## [后续发布计划、代码贡献与代码规范](./readme/code_contribution.zh-CN.md)
