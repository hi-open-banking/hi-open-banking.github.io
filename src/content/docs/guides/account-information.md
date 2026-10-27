---
title: Account information
description: Read accounts, balances, and transaction details, and handle pagination and incremental sync.
---

The account information APIs expose three resource types: accounts, balances, and transaction details. All resources are limited to the scope granted by the current token.

## List accounts

```http
GET /v1/accounts?page=1&page_size=20
```

The response includes pagination information:

```json
{
  "data": [
    {
      "account_id": "acc_8f2c1d",
      "account_type": "CURRENT",
      "currency": "CNY",
      "status": "ENABLED"
    }
  ],
  "pagination": {
    "page": 1,
    "page_size": 20,
    "total": 1
  }
}
```

## Get balances

```http
GET /v1/accounts/{account_id}/balances
```

## Incremental transaction sync

Transaction data can be large. Fetch it incrementally using `from_booking_date`, and store the timestamp of the last successful sync.

```bash
curl "https://api.openbanking.org.cn/v1/accounts/acc_8f2c1d/transactions?from_booking_date=2026-10-01" \
  -H "Authorization: Bearer $ACCESS_TOKEN"
```

:::note
A transaction's `booking_date` may change retroactively when a bank backfills entries. For reconciliation, also store `transaction_id` to deduplicate idempotently.
:::

## Field reference

| Field | Type | Description |
| --- | --- | --- |
| `account_id` | string | Unique account identifier |
| `currency` | string | ISO 4217 currency code |
| `status` | string | `ENABLED`, `DISABLED`, or `CLOSED` |
| `booking_date` | string | Booking date in `YYYY-MM-DD` format |
