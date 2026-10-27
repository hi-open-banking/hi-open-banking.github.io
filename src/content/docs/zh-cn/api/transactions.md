---
title: 交易接口
description: 查询交易明细与单笔交易。
---

## 获取交易明细

```http
GET /v1/accounts/{account_id}/transactions
```

### 查询参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `from_booking_date` | string | 起始记账日，含当天 |
| `to_booking_date` | string | 结束记账日，含当天 |
| `page` | integer | 页码 |
| `page_size` | integer | 每页条数，最大 100 |

### 响应

```json
{
  "data": [
    {
      "transaction_id": "txn_5e1a9c",
      "booking_date": "2026-10-24",
      "amount": { "currency": "CNY", "value": "-128.00" },
      "direction": "DEBIT",
      "status": "BOOKED",
      "remittance_information": "订单 20261026001"
    }
  ],
  "pagination": { "page": 1, "page_size": 20, "total": 1 }
}
```

## 获取单笔交易

```http
GET /v1/accounts/{account_id}/transactions/{transaction_id}
```

:::note
金额使用字符串表示，避免浮点误差。`direction` 为 `DEBIT` 时金额为负值。
:::
