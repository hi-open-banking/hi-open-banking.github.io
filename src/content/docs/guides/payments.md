---
title: Payment initiation
description: Create payment instructions, track status, and guarantee idempotency.
---

The Payments API follows a three-stage flow: create an instruction → user confirmation → execution. Create requests must include an `Idempotency-Key`.

## Create a payment instruction

```bash
curl -X POST https://api.openbanking.org.cn/v1/payments \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Idempotency-Key: 7d6f1c2e-4b8a-4c1d-9e2f-3a5b6c7d8e9f" \
  -d '{
    "debtor_account_id": "acc_8f2c1d",
    "creditor": {
      "name": "Example Payee",
      "account_number": "6222020202020202"
    },
    "amount": { "currency": "CNY", "value": "128.00" },
    "remittance_information": "Order 20261026001"
  }'
```

## Instruction status

| Status | Description |
| --- | --- |
| `PENDING` | Created, awaiting user confirmation |
| `ACCEPTED` | Accepted by the bank |
| `SETTLED` | Settlement completed |
| `REJECTED` | Rejected; check the reason code |

:::caution
Instructions in `PENDING` or `ACCEPTED` status must not be created again. Reuse the same `Idempotency-Key` when retrying, or you may create duplicate payments.
:::

## Query status

```http
GET /v1/payments/{payment_id}
```

Use webhooks to receive status changes, with polling as a fallback.
