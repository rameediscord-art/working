---
name: DB imports rule
description: Always import db and all table references from @workspace/db, never from a local path
---

Always import both `db` and table schemas from `@workspace/db`:

```ts
import { db, ordersTable, membershipPlansTable } from "@workspace/db";
```

**Why:** The API server has no local `db.ts` file. All db access is exported from the `@workspace/db` lib. Using `"../db"` or `"../../db"` causes esbuild build failures that prevent the server from starting.

**How to apply:** Any new route file in `artifacts/api-server/src/routes/` must use `@workspace/db` for both the `db` instance and table names.
