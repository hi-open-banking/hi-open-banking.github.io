---
title: Accounts API
description: Account list, detail, and balance endpoints.
---

## List accounts

```http
GET /v1/accounts
```

### Query parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `page` | integer | Page number, starting at 1 |
| `page_size` | integer | Items per page; default 20, maximum 100 |
| `status` | string | Filter by status |

### Response

```json
{
  "data": [
    {
      "account_id": "acc_8f2c1d",
      "account_type": "CURRENT",
      "currency": "CNY",
      "status": "ENABLED",
      "created_at": "2025-03-01T00:00:00Z"
    }
  ],
  "pagination": { "page": 1, "page_size": 20, "total": 1 }
}
```

## Get account details

```http
GET /v1/accounts/{account_id}
```

## Get balances

```http
GET /v1/accounts/{account_id}/balances
```

```json
{
  "account_id": "acc_8f2c1d",
  "available": { "currency": "CNY", "value": "12800.00" },
  "booked": { "currency": "CNY", "value": "12950.00" },
  "updated_at": "2026-10-26T08:00:00Z"
}
```

:::caution
`available` and `booked` mean different things. Available balance excludes held funds; check `available` before initiating a payment.
:::
