# AGENTS.md

This AGENTS.md guides AI agents working in `spring-ant-frontend`, especially when a frontend change must align with backend contracts from `spring-ant`.

# Part 1: Frontend/Backend Integration

- `spring-ant-frontend` is the Ant Design Pro frontend.
- `spring-ant` is the Spring Boot backend and serves APIs under the `/api` context path.
- The frontend already includes JWT login, refresh-token handling, unified HTTP response handling, and RBAC helpers.
- Keep backend-only implementation conventions in `spring-ant/AGENTS.md`; this section is only for API contracts and frontend/backend handoff rules.

## Integration Workflow

1. Start from the API contract: request DTO, response DTO, error codes, auth requirements, and any binary download behavior.
2. If the backend contract changes, align frontend service types and wrappers under `src/services`.
3. Reuse the existing unified backend response envelope for normal JSON APIs; do not create one-off frontend parsing paths.
4. If backend `ErrorCodeEnum` changes, add the same code and user-facing message to `src/locales/*/errorCode.ts`.
5. If a backend endpoint is role-restricted, keep frontend route access in sync through `src/access.ts` and `config/routes.ts`.
6. If a backend current-user payload changes, preserve `currentUser.roleIds` compatibility because frontend RBAC depends on it.

## Auth And Response Contracts

- Normal JSON APIs should go through `src/requestErrorConfig.ts` so auth headers, refresh-token logic, response unwrapping, and unified error handling stay consistent.
- JWT access tokens are sent as `Authorization: Bearer <token>`.
- Refresh tokens are sent as `refreshToken: Bearer <token>`.
- Use native `fetch` only when the response is not normal JSON, such as Excel download.
- Business errors from the backend should map to localized frontend messages through `src/locales/*/errorCode.ts`.

## Frontend Guidance

- Reuse `src/requestErrorConfig.ts` for request interception, auth headers, refresh-token logic, and unified error handling.
- Reuse `src/utils/localStorageUtil.ts` for JWT persistence.
- Reuse `src/access.ts` for route-level role checks.
- Put business-specific API wrappers in a dedicated service folder instead of embedding request logic inside the page component.
- Use native `fetch` only when the response is not normal JSON, such as Excel download.

## Validation Checklist

- Frontend type-check succeeds.
- Frontend service types match backend request and response DTOs.
- Frontend route is reachable after login.
- Admin and normal user flows both work with real backend data.


# Part 2: Frontend Structure

- `config/routes.ts`: menu and route registration.
- `config/config.ts`: Umi and Ant Design Pro runtime config.
- `src/app.tsx`: root container, initial user bootstrap, layout config, and request config export.
- `src/requestErrorConfig.ts`: request interceptors, refresh-token logic, and unified frontend error handling.
- `src/utils/localStorageUtil.ts`: JWT token persistence.
- `src/utils/refreshTokenUtil.ts`: access-token refresh flow.
- `src/access.ts`: route-level RBAC flags based on `currentUser.roleIds`.
- `src/services`: request wrappers grouped by business area.
- `src/pages`: page-level UI.
- `src/api_core/components/MessageProvider.tsx`: global message, notification, and modal access outside the component tree.

## How To Add A New Page Manually

1. Create a new folder under `src/pages` for the new business.
2. Add `index.tsx` for the page component and `index.less` for page-local styles.
3. Register the page in `config/routes.ts` with its menu name, path, icon, and component path.
4. If the page calls backend APIs, add a dedicated service file under `src/services/<feature>`.
5. If the page is role-restricted, expose or reuse an access flag in `src/access.ts` and reference it from the route.
6. If the page downloads a file instead of normal JSON, use native `fetch` with the existing JWT token from `localStorageUtil`.

## Integration Rules

- Do not bypass `requestErrorConfig.ts` for normal JSON APIs.
- Do not duplicate JWT storage logic; always reuse `localStorageUtil.ts`.
- Keep feature-specific types close to the feature service or page instead of polluting unrelated global files.

