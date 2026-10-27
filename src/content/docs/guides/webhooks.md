---
title: Webhooks
description: Receive and verify asynchronous event notifications.
---

When the status of an authorization, account, or payment changes, the platform pushes an event to the callback URL configured for your application.

## Event structure

```json
{
  "event_id": "evt_01J9Z3K4",
  "event_type": "payment.status_changed",
  "occurred_at": "2026-10-26T08:30:00Z",
  "data": {
    "payment_id": "pay_2b7d9f",
    "status": "SETTLED"
  }
}
```

## Verify the signature

Every request includes an `X-Signature` header containing an HMAC-SHA256 of the request body and your signing secret. Verify it before processing.

```js
import { createHmac, timingSafeEqual } from 'node:crypto';

function verify(body, signature, secret) {
  const expected = createHmac('sha256', secret).update(body).digest('hex');
  return (
    expected.length === signature.length &&
    timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  );
}
```

## Retry policy

- Non-`2xx` responses are retried with exponential backoff, up to 5 attempts.
- Handlers must be idempotent and deduplicate by `event_id`.
- Respond within 5 seconds; run long-running work asynchronously.

:::tip
During local development, expose your callback URL with a tunnel tool and verify signature handling and retry logic in the sandbox.
:::
