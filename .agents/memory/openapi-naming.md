---
name: OpenAPI schema naming rule
description: Naming schemas ending in Response or Body matching an operation ID causes TS2308 in generated client
---

Never name OpenAPI schemas with the pattern `<OperationIdPascalCase>Response` or `<OperationIdPascalCase>Body`.

**Why:** Orval's codegen generates types with these suffixes internally. If you define a schema with the same name in openapi.yaml, you get a TS2308 "exported multiple times" error in the generated API client.

**How to apply:** Use semantic names instead — e.g. `OrderList` instead of `ListOrdersResponse`, `OrderUpdate` instead of `UpdateOrderBody`.
