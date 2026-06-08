# AGENTS.md

This AGENTS.md serves as a overview guide for AI on implementing a new business solution that integrates frontend and backend.

## Workspace Overview

- `spring-ant` is the Spring Boot backend.
- `spring-ant-frontend` is the Ant Design Pro frontend.
- The backend serves APIs under the `/api` context path.
- The frontend already includes JWT login, refresh-token handling, unified HTTP response handling, and RBAC helpers.

## Full-Stack Feature Workflow

1. Start from the database and business contract.
2. Add or update SQL under `spring-ant/readme/sql` when a new feature needs new tables or seed data.
3. Implement backend DTO, controller, service, mapper, and mapper XML under `spring-ant/src/main/java` and `spring-ant/src/main/resources/mapper`.
4. Reuse the existing unified backend response envelope instead of inventing a new format.
5. Update Spring Security route rules if the new backend endpoints need role-based protection.
6. Add or update frontend API wrappers under `spring-ant-frontend/src/services`.
7. Add the frontend page under `spring-ant-frontend/src/pages`, then register the route in `spring-ant-frontend/config/routes.ts`.
8. Reuse the existing frontend auth and request pipeline instead of bypassing it.
9. Validate the backend with `./gradlew.bat compileJava` and the frontend with `npm run tsc`.

## Backend Guidance

- Controllers should stay thin and delegate business logic to services.
- Business errors should use `CodeException` with `ErrorCodeEnum` so the frontend can handle them consistently.
- The unified response format comes from `MainAspect` and `ResponseStructureUtil`; normal JSON endpoints should keep using it.
- File download endpoints that return binary data should be added to `MainAspect.NO_CHANGE_RESULT_URLS`.
- JWT auth uses `Authorization: Bearer <token>` for access tokens and `refreshToken: Bearer <token>` for refresh tokens.
- Frontend RBAC depends on `currentUser.roleIds`, so backend current-user payloads must keep returning role IDs.

## Frontend Guidance

- Reuse `src/requestErrorConfig.ts` for request interception, auth headers, refresh-token logic, and unified error handling.
- Reuse `src/utils/localStorageUtil.ts` for JWT persistence.
- Reuse `src/access.ts` for route-level role checks.
- Put business-specific API wrappers in a dedicated service folder instead of embedding request logic inside the page component.
- Use native `fetch` only when the response is not normal JSON, such as Excel download.

## Validation Checklist

- Backend SQL matches backend mapper and service expectations.
- Backend compile succeeds.
- Frontend type-check succeeds.
- Frontend route is reachable after login.
- Admin and normal user flows both work with real backend data.
