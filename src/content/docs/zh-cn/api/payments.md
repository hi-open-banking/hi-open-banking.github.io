---
title: 支付接口
description: 创建、查询与取消支付指令。
---

## 创建支付指令

```http
POST /v1/payments
Idempotency-Key: <uuid>
```

### 请求体

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `debtor_account_id` | string | 是 | 付款账户 |
| `creditor.name` | string | 是 | 收款方名称 |
| `creditor.account_number` | string | 是 | 收款账号 |
| `amount.currency` | string | 是 | ISO 4217 货币代码 |
| `amount.value` | string | 是 | 金额字符串，两位小数 |
| `remittance_information` | string | 否 | 附言，最长 140 字符 |

### 响应

```json
{
  "payment_id": "pay_2b7d9f",
  "status": "PENDING",
  "created_at": "2026-10-26T08:30:00Z"
}
```

## 查询支付指令

```http
GET /v1/payments/{payment_id}
```

## 取消支付指令

```http
DELETE /v1/payments/{payment_id}
```

仅 `PENDING` 状态可取消。取消成功后状态变为 `CANCELLED`。
