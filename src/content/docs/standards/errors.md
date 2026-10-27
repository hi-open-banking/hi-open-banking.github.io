---
title: Error codes
description: Common error codes, their meanings, and recommended handling.
---

## Error structure

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter amount",
    "request_id": "req_01J9Z3K4"
  }
}
```

## General error codes

| HTTP | Code | Description | Recommended handling |
| --- | --- | --- | --- |
| 400 | `INVALID_REQUEST` | Invalid request parameters | Fix the parameters based on `message` |
| 401 | `UNAUTHORIZED` | Missing or invalid access token | Obtain a new token |
| 403 | `INSUFFICIENT_SCOPE` | Token lacks the required scope | Ask the user for additional consent |
| 404 | `RESOURCE_NOT_FOUND` | Resource not found | Check the ID and authorized scope |
| 409 | `IDEMPOTENCY_CONFLICT` | Idempotency key reused by a different request | Use a different idempotency key |
| 429 | `RATE_LIMITED` | Rate limit exceeded | Back off according to `Retry-After` |
| 500 | `INTERNAL_ERROR` | Server error | Record `request_id` and retry |

## Payment errors

| Code | Description |
| --- | --- |
| `PAYMENT_REJECTED` | The bank rejected the payment |
| `INSUFFICIENT_FUNDS` | Insufficient account balance |
| `PAYMENT_NOT_CANCELLABLE` | Cancellation is not allowed in the current status |
| `ACCOUNT_NOT_PAYABLE` | The payer account is in an invalid state |

:::caution
Do not retry `INTERNAL_ERROR` immediately. Wait at least one second and reuse the same `Idempotency-Key`.
:::
