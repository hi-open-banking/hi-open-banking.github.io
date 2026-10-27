---
title: Sandbox
description: Sandbox URL, test accounts, and simulated scenarios.
---

The sandbox behaves like production but never moves real funds. All test data is reset every Sunday at midnight.

## Environment URLs

| Environment | URL |
| --- | --- |
| Sandbox | `https://sandbox.api.openbanking.org.cn` |
| Production | `https://api.openbanking.org.cn` |

## Test accounts

The sandbox provides seeded accounts covering available, frozen, and closed states:

| Account ID | Status | Balance |
| --- | --- | --- |
| `acc_8f2c1d` | ENABLED | 12,800.00 CNY |
| `acc_3a9b7e` | DISABLED | 0.00 CNY |
| `acc_6c4d2f` | CLOSED | — |

## Simulate payment outcomes

Add an `X-Sandbox-Scenario` header when creating a payment instruction to trigger a specific outcome:

```bash
curl -X POST https://sandbox.api.openbanking.org.cn/v1/payments \
  -H "Authorization: Bearer $SANDBOX_TOKEN" \
  -H "Idempotency-Key: $UUID" \
  -H "X-Sandbox-Scenario: payment_rejected" \
  -H "Content-Type: application/json" \
  -d @payment.json
```

Available scenarios: `payment_accepted`, `payment_rejected`, and `payment_pending`.

:::note
Sandbox tokens and production tokens are not interchangeable. When switching environments, replace both the client credentials and the API base URL.
:::
