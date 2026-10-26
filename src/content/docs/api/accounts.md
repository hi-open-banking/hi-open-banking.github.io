---
title: 账户接口
description: 账户列表、详情与余额端点。
---

## 获取账户列表

```http
GET /v1/accounts
```

### 查询参数

| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `page` | integer | 页码，从 1 开始 |
| `page_size` | integer | 每页条数，默认 20，最大 100 |
| `status` | string | 按状态过滤 |

### 响应

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

## 获取账户详情

```http
GET /v1/accounts/{account_id}
```

## 获取余额

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
`available` 与 `booked` 含义不同。可用余额已扣除冻结金额，付款前请以 `available` 为准。
:::
