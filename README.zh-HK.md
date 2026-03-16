Language : [English](README.md) | [简体中文](README.zh-CN.md)

## Sprint Ant Frontend ([Spring Ant Family](https://github.com/HKPC-1967/spring-ant)的前端部分)

Sprint Ant Frontend 基於 [Ant Design Pro v6.0.0-beta.1](https://github.com/ant-design/ant-design-pro)，這是一個開箱即用的企業級 UI 框架，也是我們找到的最好的用於開發後台管理系統的 React 框架。可在這裡預覽原始 Ant Design Pro 功能：[Ant Design Pro Preview](https://preview.pro.ant.design/dashboard/analysis)。

我們對基礎框架做了以下增強：

- 統一的 HTTP payload 格式，與後端 [Spring Ant Backend](https://github.com/HKPC-1967/spring-ant) 整合。[requestErrorConfig.ts](src/requestErrorConfig.ts)
- Loading 狀態管理（載入中的局部 loading 動畫以及全域遮罩，避免請求進行中使用者繼續操作）。[LoadingContext.tsx](src/api_core/components/LoadingContext.tsx)
- 基於 `errorCode` 和 `showType` 的統一異常處理；同時對網路錯誤和 HTTP 層級錯誤也做了統一處理。[requestErrorConfig.ts](src/requestErrorConfig.ts) [MessageProvider.tsx](src/api_core/components/MessageProvider.tsx)
- 基於 JWT 的認證（access token 與 refresh token）。[localStorageUtil.ts](src/utils/localStorageUtil.ts) [refreshTokenUtil.ts](src/utils/refreshTokenUtil.ts)
- 與後端整合的 RBAC（基於角色的存取控制）。[access.ts](src/access.ts) [routes.ts](config/routes.ts)
- 支援 Docker 多階段建置。[Dockerfile](Dockerfile)

你可以對比 `main` 分支與 `original_ant_design_pro_code/release_v6.0.0-beta.1` 分支，查看我們在原始的 Ant Design Pro 程式碼基礎上做了哪些程式碼改動。  
本專案是 [Spring Ant Family](https://github.com/HKPC-1967/spring-ant) 的前端部分。

## 環境準備（Node.js 與 PNPM）

### 方案 1：[使用 Volta](./readme/volta.zh-HK.md)（推薦用於在多個專案間統一管理 Node.js 與 PNPM 版本）

### 方案 2：不使用 Volta（如果你不熟悉 Volta，推薦快速開始採用此方案）

檢查 Node.js 版本：

```bash
node --version
```

安裝 `pnpm`：

```bash
npm install pnpm -g
```

檢查 `pnpm` 版本：

```bash
pnpm --version
```

安裝依賴：

```bash
pnpm install
```

## PNPM 指令稿

指令稿定義在 [package.json](package.json) 中。

### 本機開發熱更新執行（環境：`config.dev.ts`）

`config.${UMI_ENV}.ts` 官方文件: https://umijs.org/docs/guides/env-variables#umi_env

> **注意**：如果使用 `pnpm start`，`REACT_APP_ENV` 的值會是 `false`，而不是 `dev`。

```bash
pnpm run start:dev
```

### 建置專案

- 測試環境建置（環境：`config.test.ts`）

```bash
pnpm run build:test
```

- 生產環境建置（環境：`config.ts`）

```bash
pnpm run build
```

## Docker 指令稿

### Docker 建置

- 測試環境建置

```bash
docker build --build-arg BUILD_COMMAND="build:test" -t base_front .
```

- 生產環境建置

```bash
docker build -t base_front .
```

### Docker 執行

```bash
docker run -itdp 80:80 --name base_front base_front
```

## [後續發佈計畫、程式碼貢獻與程式碼規範](./readme/code_contribution.zh-HK.md)
