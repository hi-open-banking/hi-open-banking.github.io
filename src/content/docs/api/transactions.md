---
title: Transactions API
description: Query transaction history and individual transactions.
---

## List transactions

```http
GET /v1/accounts/{account_id}/transactions
```

### Query parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `from_booking_date` | string | Start booking date, inclusive |
| `to_booking_date` | string | End booking date, inclusive |
| `page` | integer | Page number |
| `page_size` | integer | Items per page, maximum 100 |

### Response

```json
{
  "data": [
    {
      "transaction_id": "txn_5e1a9c",
      "booking_date": "2026-10-24",
      "amount": { "currency": "CNY", "value": "-128.00" },
      "direction": "DEBIT",
      "status": "BOOKED",
      "remittance_information": "Order 20261026001"
    }
  ],
  "pagination": { "page": 1, "page_size": 20, "total": 1 }
}
```

## Get a single transaction

```http
GET /v1/accounts/{account_id}/transactions/{transaction_id}
```

:::note
Amounts are strings to avoid floating-point errors. When `direction` is `DEBIT`, the amount is negative.
:::
