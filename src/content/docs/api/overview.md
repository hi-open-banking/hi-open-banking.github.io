---
title: API overview
description: Base URL, request conventions, pagination, idempotency, and error handling.
---

All APIs follow the same request and response conventions.

## Base URL

```text
https://api.openbanking.org.cn/v1
```

## Request headers

| Header | Required | Description |
| --- | --- | --- |
| `Authorization` | Yes | `Bearer <access_token>` |
| `Content-Type` | Yes | `application/json` (except form endpoints) |
| `X-Request-Id` | No | Caller-generated request identifier for tracing |
| `Idempotency-Key` | Required for payments | Idempotency key; UUID v4 recommended |

## Pagination

List endpoints use `page` and `page_size`; `page_size` is capped at 100.

```json
{
  "data": [],
  "pagination": { "page": 1, "page_size": 20, "total": 0 }
}
```

## Error responses

Non-`2xx` responses return a structured error:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Account not found",
    "request_id": "req_01J9Z3K4"
  }
}
```

:::note
Branch on `error.code`. The `message` field is for display only and may change with language or version.
:::

## Versioning

The version is part of the path (`/v1`). Incompatible changes are released as a new version, and older versions are supported for at least 12 months.
