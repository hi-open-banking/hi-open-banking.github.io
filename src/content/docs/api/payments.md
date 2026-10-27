---
title: Payments API
description: Create, query, and cancel payment instructions.
---

## Create a payment instruction

```http
POST /v1/payments
Idempotency-Key: <uuid>
```

### Request body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `debtor_account_id` | string | Yes | Payer account |
| `creditor.name` | string | Yes | Payee name |
| `creditor.account_number` | string | Yes | Payee account number |
| `amount.currency` | string | Yes | ISO 4217 currency code |
| `amount.value` | string | Yes | Amount string with two decimal places |
| `remittance_information` | string | No | Remittance information, up to 140 characters |

### Response

```json
{
  "payment_id": "pay_2b7d9f",
  "status": "PENDING",
  "created_at": "2026-10-26T08:30:00Z"
}
```

## Query a payment instruction

```http
GET /v1/payments/{payment_id}
```

## Cancel a payment instruction

```http
DELETE /v1/payments/{payment_id}
```

Only instructions in `PENDING` status can be cancelled. On success, the status becomes `CANCELLED`.
